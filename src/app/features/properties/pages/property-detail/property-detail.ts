import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DetailAmenities } from '../../components/detail-amenities/detail-amenities';
import { DetailDescription } from '../../components/detail-description/detail-description';
import { DetailHeader } from '../../components/detail-header/detail-header';
import { DetailPricing } from '../../components/detail-pricing/detail-pricing';
import { HeroGallery } from '../../components/hero-gallery/hero-gallery';
import { PropertiesService } from '../../services/properties.service';

@Component({
  selector: 'app-property-detail',
  imports: [HeroGallery, DetailPricing, DetailHeader, DetailAmenities, DetailDescription],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyDetailPage {
  readonly propertiesService = inject(PropertiesService);

  readonly id = input.required<string>();

  readonly property = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => this.propertiesService.getPropertyById(params.id),
  });
}
