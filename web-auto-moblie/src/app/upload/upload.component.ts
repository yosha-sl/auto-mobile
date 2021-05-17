import { Component, OnInit } from '@angular/core';
import { ToastService } from '../shared/component/toast/toast-service';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private uploadService:UploadService,
    public toastService: ToastService) { }

  ngOnInit(): void {
  }

  handleFileInput(event:any) {
    let file:File = event?.target?.files[0];
    if(file)this.uploadService.uploadCSVFile(file).subscribe( res => {
      //this.toastService.show('CSV Uploading completed');
      event.target.value = '';
    });
  }
    
    
}
