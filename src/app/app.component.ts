import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss']
})
export class AppComponent {
  currentPage: any = ''

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(['/'].includes(event.urlAfterRedirects)) {
          this.currentPage = ""
        } else if(['/about-us'].includes(event.urlAfterRedirects)) {
          this.currentPage = "about-us"
        } else if(['/services', '/fda'].includes(event.urlAfterRedirects)) {
          this.currentPage = "services"
        } else if(['/contact-us'].includes(event.urlAfterRedirects)) {
          this.currentPage = "contact-us"
        } else {
          this.currentPage = ""
        }
      }
    });
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

  addLINE() {
    window.open('https://line.me/ti/p/-2IMXhkbVt', '_blank', 'noopener,noreferrer');
  }
}
