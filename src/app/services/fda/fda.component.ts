import { Component } from '@angular/core';

@Component({
  selector: 'app-fda',
  templateUrl: './fda.component.html',
  styleUrls: ['./fda.component.scss', './../../../styles.scss']
})
export class FdaComponent {
  isImageLoaded01 = false;

  onImageLoad(picture: string) {
    if (picture === 'isImageLoaded01') {
      this.isImageLoaded01 = true;
    }
  }
}
