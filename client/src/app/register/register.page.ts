import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  contactInfo: number = 0; // 0 for phn number, 1 for email
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
      firstName: [""],
      lastName: [""],
      email: [""],
      contactNumber: [""],
    })
  }

  toggleContactInfo() {
    if(this.contactInfo == 0) this.contactInfo = 1;
    else this.contactInfo = 0;
  }

  async register() {
    if(this.registerForm.invalid) {
      console.log("Form invalid!");
      return;
    }

    await this.authService.register(this.registerForm.value);
  }

}
