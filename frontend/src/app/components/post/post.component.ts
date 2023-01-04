import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service/post.service';
import {map, takeUntil} from 'rxjs/operators';
import { pipe, Subject } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts:any[] = [];
  sub$ = new Subject();
  searchInput :any ={title:''};
  currentPg : number = 1;
  itemsPerPage :number =4;
  constructor(private postService:  PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.postService.getPost().pipe(
      takeUntil(this.sub$)
    ).subscribe(result => {

      this.posts= result;



    });
    this.currentPg = 1;
  }
  PageSize(event:Event) {
    const newSize = (event.target as HTMLInputElement).value
    this.itemsPerPage = Number(newSize);
    this.currentPg = 1;
  }

}
