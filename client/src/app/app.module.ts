import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UploadinfoComponent } from './uploadinfo/uploadinfo.component';
import { ErrorinfoComponent } from './errorinfo/errorinfo.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import {FormsModule} from '@angular/forms';
import { UploadedService } from './service/uploaded.service';
import { ModalModule } from 'ng2-modal-dialog/modal.module';

@NgModule({
  declarations: [
    AppComponent,
    UploadinfoComponent,
    ErrorinfoComponent,
    FileuploadComponent
  ],
  imports:   [BrowserModule, HttpModule, FormsModule,ModalModule],
  providers: [UploadedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
