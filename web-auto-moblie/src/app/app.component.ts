import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import * as socketClusterClient from 'socketcluster-client';
import { environment } from 'src/environments/environment';
import { ToastService } from './shared/component/toast/toast-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {'window:beforeunload':'doSomething'}
})
export class AppComponent implements OnInit {
  title = 'web-auto-moblie';

  migrationResult:[] = [];
  msgShow = false;

  constructor(
    public toastService: ToastService) {
  }
  

  ngOnInit(): void {
    this.initSocketCluster();
  }

  async initSocketCluster() {
    let skid:any = sessionStorage.getItem('skid');
    if(!skid){
      const uuid = Guid.create().toString();
      sessionStorage.setItem('skid', uuid);
      skid = uuid;
    }
    
    let socket = await socketClusterClient.create({
      hostname: environment.hostName,
      port: environment.port
    });

    let channel = socket.subscribe(skid);
    for await (let data of channel) {
      this.showSuccess(data);
    }
  }

  close() {
    this.msgShow = false;
  }

  showSuccess(msg) {
    this.toastService.show(msg, { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(msg) {
    this.toastService.show(msg, { classname: 'bg-danger text-light', delay: 10000 });
  }

  // getReadyFileownload(){
  //   return this.http.post(`${environment.baseURL}/files/readyDownload`, 
  //     {
  //       vehicles: 'nodata',
  //       skid: sessionStorage.getItem('skid')
  //     }
  //   ).subscribe(res => {
  //     console.log(res);
  //   });
  // }

}
