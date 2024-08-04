import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  constructor(private router: Router,
    private dataService: DataService
  ) { }
  
  ngOnInit() {
    this.getData();
  }

  data: any[] = [];
  getData() {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
    });
  }

  addData(newData: any) {
    this.dataService.addData(newData).subscribe(() => {
      this.getData();
    });
  }

  updateData(id: number, updatedData: any) {
    this.dataService.updateData(id, updatedData).subscribe(() => {
      this.getData();
    });
  }

  deleteData(id: number) {
    this.dataService.deleteData(id).subscribe(() => {
      this.getData();
    });
  }
}
