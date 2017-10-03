import { Component, OnInit } from '@angular/core';
import { UploadedService } from '../service/uploaded.service';
import { Todo } from '../result/todo'
import { Uploadresult } from '../result/Uploadresult'


@Component({
  selector: 'app-uploadinfo',
  templateUrl: './uploadinfo.component.html',
  styleUrls: ['./uploadinfo.component.css'],
  providers:[UploadedService]
})

export class UploadinfoComponent implements OnInit {

  todolist:Todo[]
  uploadlist:Uploadresult[]
  title:string;
  
  constructor(private uploadeService: UploadedService) {}

  ngOnInit(): void {
    this.title = 'Test'
    //call service
    this.uploadeService.getTodolist()
    .subscribe((todolists) =>{
        this.todolist = todolists
    })

    this.uploadeService.getuploadelist()
    .subscribe((uploadlists) =>{
        this.uploadlist = uploadlists
    })

    //throw new Error("Method not implemented.");
  }
  



}
