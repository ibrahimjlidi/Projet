
import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user-service/user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']

})

export class UsersComponent implements OnInit {
 users:User[] = [];
 searchInput :User ={name:''};
  filterUser: User[] = [];
  _filterText: string ='';
  currentPg : number = 1;
  itemsPerPage :number =5;
  filterName ='';


  get filterTextName(){
    return this.filterName;
  }
  set filterTextName(value: string){
    this.filterName = value;
    this.filterUser = this.filterUserByName(value);
  }
  get filterText(){
    return this._filterText;
  }
  set filterText(value: string){
    this._filterText = value;
    this.filterUser = this.filterUserByRole(value);
  }

  constructor(private userService:UserService) { }



  ngOnInit(): void {

    this.filterUser= this.users;
    this.userService.getUsers().subscribe(result => {

      this.users= result.items;
      this.currentPg=1;

    })
  }
  PageSize(event:Event) {

    const newSize = (event.target as HTMLInputElement).value
    this.itemsPerPage = Number(newSize);
    this.currentPg = 1;

  }

  deleteUser(id:any){
    this.userService.delete(id).subscribe(res => {
      this.ngOnInit();
      console.log('User deleted successfully!');
    })
  }
  filterUserByRole(value: string): User[] {
    if(this.users.length===0 || this.filterText === ''){
      return this.users;
    } else {
      return this.users.filter((users) =>
      {
        return users.role?.toLowerCase() === value.toLowerCase()
      })
    }
  }
  filterUserByName(value: string): User[] {
    if(this.users.length===0 || this.filterTextName === ''){
      return this.users;
    } else {
      console.log("ddd")
      return this.users.filter((users) =>
      {
        return users.name?.toLowerCase() === value.toLowerCase()
      })
    }
  }



}


