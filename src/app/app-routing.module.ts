import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "ReactiveForm", component: ReactiveFormComponent},
  //trang này tùy thuộc vào id của student sẽ truy cập vào sinh viên đã tồn tại hoặc ko tồn tại. nếu id=0 là form nhập mới,
  //nếu id>0 sẽ là trang sửa sinh viên
  {path: "student-form/:id", component: StudentFormComponent},
  {path: "students",component:  StudentsComponent},
  //path ** phải để cuối cùng
  {path: "**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
