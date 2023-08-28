import { Component } from '@angular/core';
import { ServerHttpService } from '../Services/server-http.service';
import { CommonService } from '../Services/common.service';
import { catchError } from 'rxjs';
import { Student } from '../models/Student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
   public students: Student[] = [];

  constructor (
    private serverHttp: ServerHttpService,
    private common: CommonService,
    //dịch vụ router giúp đưa vào trang khác
    private router: Router
    ) {}

    ngOnInit(): void {
      this.loadData();
    }

    public loadData() {
      this.serverHttp.getStudents().subscribe((data) => {
        console.log('data là', data);
        this.students=data as Student[];
        console.log('getStudents là', this.students);
      });
    }
    
    public addStudent() {
      //khi id là số 0 thì thêm mới ngược lại thì chỉnh sửa
      this.router.navigate(['student-form',0]);
    }

    public deleteStudent(studentCode: any) {
      console.log('student',studentCode);
      this.serverHttp.deleteStudent(studentCode).subscribe((data:any) => {
        console.log('delete',data);
        this.loadData();
      });
    }
    //hàm này để truy cập vào student-form sửa sinh viên tương  ứng với id của sinh viên đó
    public editStudent(studentId: any) {
      //hàm biến kiểu any thành number
      (studentId as number).toExponential();
      this.router.navigate(['student-form',studentId]);
    }
}
