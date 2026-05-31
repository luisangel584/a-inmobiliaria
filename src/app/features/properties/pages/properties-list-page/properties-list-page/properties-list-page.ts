import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
  computed,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PropertyCard } from '../../../components/property-card/property-card';
import { PropertiesService } from '../../../services/properties.service';
import { Property } from '../../../interfaces/property.interface';

@Component({
  selector: 'app-properties-list-page',
  imports: [PropertyCard],
  templateUrl: './properties-list-page.html',
  styleUrl: './properties-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesListPage implements OnInit {
  private readonly propertiesService = inject(PropertiesService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly currentPage = signal(1);
  private readonly nextPageUrl = signal<string | null>(null);

  readonly items = signal<Property[]>([]);
  readonly isLoading = signal(false);
  readonly hasError = signal(false);
  readonly hasMore = computed(() => this.nextPageUrl() !== null);

  ngOnInit(): void {
    this.fetch(1);
  }

  loadMore(): void {
    this.fetch(this.currentPage() + 1);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private fetch(page: number): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.propertiesService
      .getProperties(page)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          this.currentPage.set(response.current_page);
          this.nextPageUrl.set(response.next_page_url);
          this.items.update((prev) => [...prev, ...response.data]);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }
}
