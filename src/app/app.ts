import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNav } from './shared/components/top-nav/top-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('a-inmobiliaria');
}
