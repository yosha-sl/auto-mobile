import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {'window:beforeunload':'doSomething'}
})
export class AppComponent implements OnInit {
  title = 'web-auto-moblie';

  private socket: any;
  migrationResult:[] = [];
  msgShow = false;

  constructor(public toastService: ToastService) {
    this.socket = io(environment.baseURL);
  }
  

  ngOnInit(): void {
    this.initSocketConfiguration();
    this.socket.on('msgToClient', (fileName: any) => {
      console.log('Something has been recived :)')
      // this.migrationResult.push('Done');
      this.showSuccess("Migration Completed");
    });
    this.socket.on('csvSource',(fileName: any) => {
      console.log('Something has been recived :)')
      // this.migrationResult.push('Done');
      this.showDanger("CSV ready for download");
    });
  }

  // sendMessage() {
  //   this.socket.emit('alert', sessionStorage.getItem('skid'));
  // }

  initSocketConfiguration(){
    let skid:any = sessionStorage.getItem('skid');
    if(!skid){
      const uuid = Guid.create().toString();
      sessionStorage.setItem('skid', uuid);
      skid = uuid;
    }
    this.socket.emit('joinToAlert', skid);
    this.socket.emit('joinToCSVGen',skid);
  }

  close() {
    this.msgShow = false;
  }



  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess(msg) {
    this.toastService.show(msg, { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(msg) {
    this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 10000 });
  }

}
