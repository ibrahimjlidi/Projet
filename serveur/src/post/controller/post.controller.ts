import { JwtAuthGuard } from 'src/auth/gurads/jwt-guard';
import { PostIn } from './../models/post.interface';
import { Observable } from 'rxjs';
import { PostService } from './../service/post.service';
import {
  BadRequestException,
  UseInterceptors,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response, Request, Express } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/models/user.interface';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/gurads/roles.gurad';
import { Roles } from 'src/auth/gurads/role.enum';

@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() post: PostIn, @Req() req: Request): Observable<PostIn> {
    // console.log(user)
    //@ts-ignore
    return this.postService.createPost(post);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Observable<PostIn[]> {
    return this.postService.findAllPost();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() post: PostIn,
  ): Observable<UpdateResult> {
    return this.postService.updatePost(id, post);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.postService.deletePost(id);
  }

  @Post('upload-photo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './Uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtenstion = file.originalname.split('.')[1];
          const newFileName =
            name.split('').join('_') + '_' + Date.now() + '.' + fileExtenstion;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file is not image ');
    } else {
      const response = {
        filePath: `http://localhost:3000/api/post/pictures/${file.filename}`,
      };
      return response;
    }
  }

  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: './Uploads' });
  }
}
