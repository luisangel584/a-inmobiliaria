import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-detail-pricing',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './detail-pricing.html',
  styleUrl: './detail-pricing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPricing {
  readonly Precio = input.required<string>();
  readonly FkPropiedad = input.required<string>();
}
