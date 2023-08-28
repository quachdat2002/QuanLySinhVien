import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class ServerHttpService {

  private httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //Authorization: 'my-auth-token',
    }),
  };

  private REST_API_SERVER = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}

  public getStudents() {
    const url = `${this.REST_API_SERVER}/api/students/getStudents`;
    return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }
  
  public getStudent(studentId:number) {
    const url = `${this.REST_API_SERVER}/api/students/getStudent?id=`+studentId;
    return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  //data loại là Student trong models
  public addStudent(data: Student) {
    const url = `${this.REST_API_SERVER}/api/students/addStudent`;
    return this.httpClient.post<any>(url,data, this.httpOptions).pipe(catchError(this.handleError));
  }

  public modifyStudent(studentId: number, data: Student) {
    const url = `${this.REST_API_SERVER}/api/students/modifyStudent?id=`+ studentId;
    return this.httpClient.put<any>(url,data, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteStudent(studentCode: number) {
    const url = `${this.REST_API_SERVER}/api/students/deleteStudent?code=` + studentCode;
    return this.httpClient.get<any>(url,this.httpOptions).pipe(catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
    console.error('An error occurred:',error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, `+ `body was: ${error.error}`
    );
  }
  return throwError('Something bad happened; please try again later. ');
  }
}
