import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AllServicesComponent } from './services/all-services/all-services.component';
import { ServiceDetailComponent } from './services/service-detail/service-detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },       // หน้าหลัก
  { path: 'about-us', component: AboutUsComponent }, // เกี่ยวกับเรา
  { path: 'services', component: AllServicesComponent }, // บริการ
  { path: 'service-detail', component: AllServicesComponent }, // บริการ
  { path: 'service-detail/:code', component: ServiceDetailComponent }, // บริการ
  { path: 'contact-us', component: ContactUsComponent }, // ติดต่อเรา
  { path: 'login', component: LoginComponent },       // หน้าหลัก
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
