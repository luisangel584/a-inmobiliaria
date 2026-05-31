import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matChevronLeft, matChevronRight, matClose } from '@ng-icons/material-icons/baseline';
import { PropertyImage } from '../../interfaces/property.interface';

@Component({
  selector: 'app-hero-gallery',
  imports: [NgIcon],
  providers: [provideIcons({ matChevronLeft, matChevronRight, matClose })],
  templateUrl: './hero-gallery.html',
  styleUrl: './hero-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroGallery {
  readonly images = input.required<PropertyImage[]>();
  readonly activeImage = signal<PropertyImage | null>(null);
  readonly activeIndex = computed(() => this.images().findIndex(i => i.PkImagen === this.activeImage()?.PkImagen));

  open(img: PropertyImage): void {
    this.activeImage.set(img);
  }

  close(): void {
    this.activeImage.set(null);
  }

  prev(): void {
    const i = this.activeIndex();
    this.activeImage.set(this.images()[i > 0 ? i - 1 : this.images().length - 1]);
  }

  next(): void {
    const i = this.activeIndex();
    this.activeImage.set(this.images()[(i + 1) % this.images().length]);
  }
}
