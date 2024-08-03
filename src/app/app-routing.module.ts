import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FdaComponent } from './services/fda/fda.component';

const routes: Routes = [
  { path: '', component: HomeComponent },       // หน้าหลัก
  { path: 'about-us', component: AboutUsComponent }, // เกี่ยวกับเรา
  { path: 'fda', component: FdaComponent }, // บริการ
  { path: 'contact-us', component: ContactUsComponent } // ติดต่อเรา
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
