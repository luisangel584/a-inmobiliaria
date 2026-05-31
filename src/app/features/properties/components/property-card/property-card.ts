import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matArrowDownward } from '@ng-icons/material-icons/baseline';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'app-property-card',
  imports: [RouterLink, NgIcon, CurrencyPipe],
  providers: [provideIcons({ matArrowDownward })],
  templateUrl: './property-card.html',
  styleUrl: './property-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCard {
  readonly property = input.required<Property>();
}
