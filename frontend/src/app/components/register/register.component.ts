import { AuthenticationService, } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm! : FormGroup;

  constructor(
    private authService:AuthenticationService,
    private formBuilder: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      role:[null,[Validators.required]],
      phone:[null,[Validators.required]],
      username :[null,[Validators.required]],
      email:[null,[
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ]],
      password:[null,[
        Validators.required,
        Validators.minLength(6)
      ]],
      passwordConfirm:[null,[Validators.required]]
    })
  }

  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }
    console.log(this.registerForm.value)
    this.authService.register(this.registerForm.value).pipe(
      map(user=> this.router.navigate([''])),
    ).subscribe();
  }


}
