
import { ServerHttpService } from './../Services/server-http.service';
import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
import { Student } from '../models/Student';
import { CommonService } from '../Services/common.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
  public id=0;
  public students: Student[] = [];
  constructor (
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  public studentForm = new FormGroup({
    code: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    picture: new FormControl('')
  });

   ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.id>0) {
      //load data
      this.loadData(this.id);
    }
   }
   public st: Student[]=[];
   private loadData(id: number) {
    console.log('load data',id);
    this.serverHttp.getStudent(id).subscribe((data)=> {
      console.log('getStudent',data);
      this.st=data as Student[];
      //method patch value là gán data vừa lấy từ backend về để gán vào đối tượng student form
      this.studentForm.setValue({
        code: '3120411045',
        gender:'Nam',
        age: '21',
        firstName: 'Đạt',
        lastName: 'Lê',
        dob: '2002-06-06',
        email: 'datlegmail.com',
        phone: '124214124',
        picture: 'qew',
    });
      console.log(this.st);
    });
   }

   private createNewData() {
    const newStudent = this.studentForm.value;
    return newStudent as Student;
   }

  public onSubmit() {
    console.log('onSubmit');
    const newStudent = this.studentForm.value;
    this.serverHttp.addStudent(newStudent as Student).subscribe((data) => {
      console.log(data);
      this.router.navigate(['students']);
    });
    console.log(newStudent);
  }

  public saveAndGoToList() {
    //nếu mà có tồn tại id thì gọi modify để sửa 
    if (this.id>0) {
      this.serverHttp.modifyStudent(this.id,this.createNewData()).subscribe((data) => {
        this.router.navigate(['students']);
      });
    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe((data) => {
        this.router.navigate(['students']);
      });
    }
  }

  public save() {
    if (this.id > 0) {
      this.serverHttp.modifyStudent(this.id,this.createNewData()).subscribe((data) => {

      });
    }
    else{
      this.serverHttp.addStudent(this.createNewData()).subscribe((data) => {
        this.common.increamentStudent();
        this.studentForm.reset();
      })
    }
  }
}
