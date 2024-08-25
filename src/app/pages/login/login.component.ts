import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule] ,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    form: FormGroup;

    authService = inject(AuthService)
    router = inject(Router)

    constructor( private fb: FormBuilder ){
      this.form = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required ])

      })
    }

    onSubmit (){
      if(this.form.valid) {
        console.log(this.form.value)
        this.authService.login(this.form.value).subscribe({
          next: (response) => {
            console.log(response)
            this.router.navigate(['home'])
          }
        })
      }
    }
}
