import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  imports: [],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNav {}
