import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MemoryGame';
  display: boolean = true;
  

  toggleDisplay() {
    this.display = false;
  }

}
