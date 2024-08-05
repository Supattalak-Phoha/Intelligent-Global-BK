import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
})
export class AppComponent {
  isLoginPage: boolean = false
  loginError: string = ""
  username: string = ""
  password: string = ""
  currentPage: any = ''
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private router: Router,
    private dataService: DataService
  ) { }


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
    this.dataService.login(this.username, this.password).then(
      (response: any) => {
        if (response?.id && response?.username) {
          this.isLoginPage = false
          sessionStorage.setItem('isAdmin', 'true');
          sessionStorage.setItem('username', response?.username);
          this.router.navigate(['']);
        }
        else {
          this.isLoginPage = true
          this.loginError = "กรุณาตรวจสอบ Username และ Password อีกครั้ง"
          this.password = ""
          sessionStorage.clear();
        }
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );

  }

  showEditButton() {
    const isAdmin = sessionStorage.getItem('isAdmin');
    return isAdmin?.toString().toLowerCase() === 'true';
  }

}
