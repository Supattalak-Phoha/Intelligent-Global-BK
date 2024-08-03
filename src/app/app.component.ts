import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss']
})
export class AppComponent {
  currentPage: any = ''

  constructor(private router: Router) {}

  ngOnInit() {
    // alert(this.router.url)
  }

  showPage(page: string) {
    this.currentPage = page
    this.router.navigate(['/' + page]);
  }

  showButton = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    this.showButton = scrollPosition > 10; // Show button if scrolled more than 100px
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
