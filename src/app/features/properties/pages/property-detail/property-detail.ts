import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PropertiesService } from '../../services/properties.service';

@Component({
  selector: 'app-property-detail',
  imports: [],
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
