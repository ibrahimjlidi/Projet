
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/services/authentication.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private userService:UserService,
    private router: Router) { }
  registerForm! : FormGroup;
  itemId: number | any= 0;
  user: User = {
    name: '',
    username: '',
    phone:0,
    email:'',
    role:'',
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.itemId = param.get('id') ?? 0;
      this.getById();
    });
  }
  getById(){
    this.userService.getUsersById(this.itemId).subscribe((data) => {
      this.user.name = data.name;
      this.user.username = data.username;
      this.user.phone = data.phone;
      this.user.role = data.role;
      this.user.email = data.email;

    })
  }
  update(){
    this.userService
    .update(this.itemId, this.user)
    .subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
  onSubmit(){
    if(this.registerForm.invalid){
      return;
    }

  }
}
