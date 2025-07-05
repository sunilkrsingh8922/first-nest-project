import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './auth.service';
import { UpdateLoginDto } from './dto/update-login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { LoginDto } from './dto/LoginDto.dto';
import { CreateRegisterDto } from './dto/create-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  
  @Post('signup') 
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateRegisterDto })
  signUp(@Body() createLoginDto: CreateRegisterDto) { 
    return this.loginService.create(createLoginDto);
  }

  @Post("login")
  @ApiOperation({ summary: 'Login Successfully' })
  @ApiResponse({ status: 201, description: 'User login successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: LoginDto })
  findAll(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
  
  @Get('findAll')
  findOne() {
    return this.loginService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(id);
  }
}
