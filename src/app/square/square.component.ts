import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-square',
  imports: [CommonModule],
  templateUrl: `./square.component.html`,
  styleUrls: [`./square.component.scss`]
})
export class SquareComponent {
  @Input() value: string | null = null;
}
