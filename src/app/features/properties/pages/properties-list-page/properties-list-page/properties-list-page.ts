import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PropertiesService } from '../../../services/properties.service';

@Component({
  selector: 'app-properties-list-page',
  imports: [RouterLink],
  templateUrl: './properties-list-page.html',
  styleUrl: './properties-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesListPage {
  readonly propertiesService = inject(PropertiesService);

  readonly page = signal(1);

  readonly properties = rxResource({
    params: () => ({ page: this.page() }),
    stream: ({ params }) => this.propertiesService.getProperties(params.page),
  });

  goTo(page: number): void {
    this.page.set(page);
  }
}
