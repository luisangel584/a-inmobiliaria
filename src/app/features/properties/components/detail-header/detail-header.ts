import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'app-detail-header',
  imports: [],
  providers: [],
  templateUrl: './detail-header.html',
  styleUrl: './detail-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHeader {
  readonly Metadescription = input.required<string>();
  readonly provincia = input.required<string>();
}
