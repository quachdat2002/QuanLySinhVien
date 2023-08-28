import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {
  public profileForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  })
  constructor() {}
  ngOnInit(): void {}

  public onSubmit() {
    console.log('name = '+this.profileForm.controls.name.value);
    console.log('password = '+this.profileForm.controls.password.value);
  }
}
