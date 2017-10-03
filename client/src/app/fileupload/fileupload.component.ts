import { Component, ElementRef,Inject} from '@angular/core';
import { UploadedService } from '../service/uploaded.service';
import { statusfilename } from '../result/statusfilename'




@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
  providers: [UploadedService]
})


export class FileuploadComponent {
  statusupload: string
  sf: statusfilename[]
  constructor(private uploadeService: UploadedService, private elem: ElementRef) { }
  uploadFile() {
    console.log('Call upload file API')
    let files = this.elem.nativeElement.querySelector('#selectFile').files;
    let formData = new FormData();
    let file = files[0];
    formData.append('selectFile', file, file.name);
    this.uploadeService.uploadfile(formData).subscribe(res => this.dataLoaded(res))
  }

  dataLoaded(data: any): any {
    this.statusupload = data._body[0].status
    console.log(data._body[0].status)
  }
}



