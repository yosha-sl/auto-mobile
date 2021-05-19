import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { NavModule } from './nav/nav.module';
import { UploadModule } from './upload/upload.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GraphQLModule } from './graphql.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { ToastsContainer } from './shared/component/toast/toasts-container.component';
import { ModalComponent } from './shared/component/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastsContainer,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    UploadModule,
    NavModule,
    NgbModule,
    NgbModule,
    GraphQLModule,
    VehicleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
