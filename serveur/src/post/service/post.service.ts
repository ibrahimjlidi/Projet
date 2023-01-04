import { PostIn } from './../models/post.interface';
import { Observable, from } from 'rxjs';
import { PostEntity } from './../models/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepo: Repository<PostEntity>
    ){}

    createPost(post:PostIn): Observable<PostIn>{
        return from(this.postRepo.save(post));
    }

    findAllPost(): Observable<PostIn[]>{
        return from(this.postRepo.find());
    }

    updatePost(id: number, post: PostIn): Observable<UpdateResult>{
        return from(this.postRepo.update(id, post));
    }

    deletePost(id: number): Observable<DeleteResult>{
        return from(this.postRepo.delete(id));
    }

}
