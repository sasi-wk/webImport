import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UploadedService {

  constructor(private http: Http) { }

  getTodolist() {
    return this.http.get("https://jsonplaceholder.typicode.com/todos")
      .map(res => res.json())
  }

  getuploadelist() {
    return this.http.get("http://localhost:4200/api/uploaded")
      .map(res => res.json())
  }

//   uploadfile(file){
//     // var headers = new Headers();
//     // headers.append('Content-Type','application/json');
//     return this.http.post('/api/upload',file)
//         .map(res => res.json());
// }


uploadfile(formdata: any ) {
  let _url: string = 'http://localhost:4200/api/upload';
  return this.http.post(_url, formdata)
  .catch(this._errorHandler) ;
}

private _errorHandler(error: Response) {
  console.error('Error Occured: ' + error);
  return Observable.throw(error || 'Some Error on Server Occured');

  }

}
