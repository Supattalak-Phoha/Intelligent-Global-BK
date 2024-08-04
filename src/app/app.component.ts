import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
})
export class AppComponent {
  isLoginPage: boolean = false
  currentPage: any = ''
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {




        //#region Support Service Detail
        if ((event.urlAfterRedirects).indexOf("/service-detail") !== -1) {
          event.urlAfterRedirects = "/service-detail"
        }
        //#endregion Support Service Detail

        if (['/login'].includes(event.urlAfterRedirects)) {
          this.isLoginPage = true
        } else if (['/'].includes(event.urlAfterRedirects)) {
          this.currentPage = ""
        } else if (['/about-us'].includes(event.urlAfterRedirects)) {
          this.currentPage = "about-us"
        } else if (['/services', '/service-detail'].includes(event.urlAfterRedirects)) {
          this.currentPage = "services"
        } else if (['/contact-us'].includes(event.urlAfterRedirects)) {
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
    window.open('https://line.me/ti/p/~i-coke', '_blank', 'noopener,noreferrer');
  }
}
