import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignUpDto } from './dto/sign-up.dto';
import { GetUserGuard } from './guards/get-user.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpDto, @Res() res: Response) {
    const userData = await this.userService.register(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post('sign-in')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignUpDto, @Res() res: Response) {
    const userData = await this.userService.login(dto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  }

  @Post('sign-out')
  logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    this.userService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.send('Sign out successfully ');
  }

  @Get()
  @UseGuards(GetUserGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
