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
          sessionStorage.setItem('isAdmin', 'true');
          sessionStorage.setItem('name', 'Supattalak');
        } else if (['/'].includes(event.urlAfterRedirects)) {
          this.currentPage = ""
        } else if (['/about-us'].includes(event.urlAfterRedirects)) {
          this.currentPage = "about-us"
        } else if (['/services', '/service-detail'].includes(event.urlAfterRedirects)) {
          this.currentPage = "services"
        } else if (['/contact-us'].includes(event.urlAfterRedirects)) {
          this.currentPage = "contact-us"
        } else if (['/edit'].includes(event.urlAfterRedirects)) {
          this.currentPage = "edit"
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

  login() {
    this.isLoginPage = false
    this.router.navigate(['']);
  }

  showEditButton() {
    const isAdmin = sessionStorage.getItem('isAdmin');
    return isAdmin?.toString().toLowerCase() === 'true';
  }
}
