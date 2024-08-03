import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'intelligent-global';
  currentPage: any = 'home'

  constructor(private router: Router) {}
  
  showPage(page: string) {
    this.router.navigate(['/' + page]);
  }
}
