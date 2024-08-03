import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './../../styles.scss']
})
export class HomeComponent {
  data: any[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
      (response: any) => {
        this.data = response;
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }
}
