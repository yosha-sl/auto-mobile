import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private uploadService:UploadService) { }

  ngOnInit(): void {
  }

  handleFileInput(event:any) {
    let file:File = event?.target?.files[0];
    if(file)this.uploadService.uploadCSVFile(file).subscribe( res => {
      alert('Sent');
    });
  }
    
    
}
