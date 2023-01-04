import { AuthenticationService } from './../../../services/authentication.service';
import { PostService } from 'src/app/services/post-service/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { tokenGetter } from 'src/app/services/authentication.service';
import jwt_decode from 'jwt-decode';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  posts: any[] = [];
  sub$ = new Subject();
  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private routee: ActivatedRoute,
    private auth :AuthenticationService
  ) {}

  ngOnInit(): void {
    this.postService
      .getPost()
      .pipe(takeUntil(this.sub$))
      .subscribe((result) => {
        this.posts = result;
      });
  }
  logout(){
    this.auth.logout();

  }
}
