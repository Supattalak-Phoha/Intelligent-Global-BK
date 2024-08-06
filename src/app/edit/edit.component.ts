import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, OnDestroy {
  editor: Editor = new Editor();
  html = '<p>Initial content</p>';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  
  constructor(private router: Router,
    private dataService: DataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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

  selectedFile: File | null = null;
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.selectedFile) {
      // const formData = new FormData();
      // formData.append('file', this.selectedFile, this.selectedFile.name);
      this.dataService.uploadFile(this.selectedFile).subscribe(response => {
        console.log('Upload successful', response);
      }, error => {
        console.error('Upload error', error);
      });
    
    }
  }
}
