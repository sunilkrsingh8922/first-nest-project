import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

@Controller("auth")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  
  @Post('signup') 
  signUp(@Body() createLoginDto: CreateLoginDto) { 
    return this.loginService.create(createLoginDto);
  }

  @Post("login")
  findAll(@Body() loginDto: CreateLoginDto) {
    return this.loginService.login(loginDto);
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
