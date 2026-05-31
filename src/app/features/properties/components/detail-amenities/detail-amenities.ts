import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-detail-amenities',
  templateUrl: './detail-amenities.html',
  styleUrl: './detail-amenities.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailAmenities {
  readonly ConstructedArea = input.required<number>();
  readonly Bathrooms = input.required<number>();
  readonly Bedrooms = input.required<number>();
}
