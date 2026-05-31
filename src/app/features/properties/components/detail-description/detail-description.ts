import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-detail-description',
  templateUrl: './detail-description.html',
  styleUrl: './detail-description.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailDescription {
  readonly Description = input.required<string>();
}
