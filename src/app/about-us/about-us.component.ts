import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss', './../../styles.scss']
})
export class AboutUsComponent {
  data: any = [
    {
      name: "นายสุภัทธลักษณ์ โพธิ์หา",
      position: "Software Developer",
      note: "การศึกษา : ( ศศ.บ.) เชี่ยวชาญงานบัญชี การเงิน บุคคล การจัดการเอกสารภายในบริษัท"
    },
    {
      name: "นายฐนธนินท์ พิมพ์ศิริ",
      position: "Project Manager",
      note: "การศึกษา : ( ศศ.บ.) เชี่ยวชาญงานบัญชี การเงิน บุคคล การจัดการเอกสารภายในบริษัท"
    },
    {
      name: "นายสุภัทธลักษณ์ โพธิ์หา",
      position: "Software Developer",
      note: "การศึกษา : ( ศศ.บ.) เชี่ยวชาญงานบัญชี การเงิน บุคคล การจัดการเอกสารภายในบริษัท"
    },
    {
      name: "นายฐนธนินท์ พิมพ์ศิริ",
      position: "Project Manager",
      note: "การศึกษา : ( ศศ.บ.) เชี่ยวชาญงานบัญชี การเงิน บุคคล การจัดการเอกสารภายในบริษัท"
    }
  ]

  constructor(private router: Router) {}

  
}
