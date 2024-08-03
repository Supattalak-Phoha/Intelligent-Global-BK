import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss', './../../styles.scss']
})

export class ContactUsComponent {
  isImageLoaded01 = false;

  onImageLoad(picture: string) {
    if (picture === 'isImageLoaded01') {
      this.isImageLoaded01 = true;
    }
  }
  
  openMap() {
    window.open('https://www.google.com/maps/place/ATMOZ+Ladprao+15/@13.8146151,100.5680572,17z/data=!4m6!3m5!1s0x30e29de4264fa34b:0x562e05e5595bf74!8m2!3d13.8146317!4d100.5706136!16s%2Fg%2F11hd5dtyfz?entry=ttu', '_blank', 'noopener,noreferrer');
  }
}
