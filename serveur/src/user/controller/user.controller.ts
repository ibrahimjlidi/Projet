
import { JwtAuthGuard } from './../../auth/gurads/jwt-guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Observable, map, catchError, of } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { RolesGuard } from 'src/auth/gurads/roles.gurad';
import { Roles } from 'src/auth/gurads/role.enum';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
//import { CurrentUserGuard } from 'src/auth/decorator/current-user.guard';
//import { CurrentUser } from 'src/auth/decorator/user.decorator';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Post()
  create(@Body() users: User): Observable<User | Object> {
    return this.userService.create(users).pipe(
      map((users: User) => users),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Post('login')
  login(
    @Body() users: User,
   // @Res() res: Response,
    @Req() req: Request,
  ): Observable<Object> {
    return this.userService.login(users).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<User> {
    return this.userService.findOne(id);
  }


  @Get('find/all')
  getuser(): Observable<User> {
    return this.userService.getuser();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)

  // @UseGuards(JwtAuthGuard,RolesGuard)
  @Get()
  @hasRoles(Roles.ADMIN)
  index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('username' )username :string,
    @Req() req: Request,
    //@CurrentUser() user: User,

  ): Observable<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    if (username === null || username === undefined){
      
   
    //console.log(user);
    return this.userService.paginate({
      page: Number(page),
      limit: Number(limit),
      route: 'http://localhost:3000/users',
    }); }else{return this.userService.paginateFilterByUsername({
      page: Number(page),
      limit: Number(limit),
      route: 'http://localhost:3000/users' 

    },{username}
    )

    }
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() users: User,
  ): Observable<UpdateResult> {
    return this.userService.update(id, users);
  }
  @hasRoles(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() users: User,
  ): Observable<User> {
    return this.userService.updateRoleOfUser(Number(id), users);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.delete(id);
  }
}
