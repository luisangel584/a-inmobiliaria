import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PropertyImage } from '../../interfaces/property.interface';

@Component({
  selector: 'app-hero-gallery',
  imports: [],
  templateUrl: './hero-gallery.html',
  styleUrl: './hero-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroGallery {
  readonly images = input.required<PropertyImage[]>();
}
