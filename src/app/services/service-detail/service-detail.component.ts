import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent {
  isImageLoaded01 = false;
  code: any = "";

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
    });
  }


  onImageLoad(picture: string) {
    if (picture === 'isImageLoaded01') {
      this.isImageLoaded01 = true;
    }
  }
}
