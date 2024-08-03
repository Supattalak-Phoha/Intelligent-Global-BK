import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentPage: any = ''

  constructor(private router: Router) {}
  
  showPage(page: string) {
    this.currentPage = page
    this.router.navigate(['/' + page]);
  }
}
