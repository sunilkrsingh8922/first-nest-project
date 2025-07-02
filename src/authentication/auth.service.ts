import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './entities/login.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    // private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  @InjectModel(Login.name) private signUpModel: Model<Login>;

  async create(createLoginDto: CreateLoginDto,) {

    var log= await this.signUpModel.findOne({username:createLoginDto.username});
    if(log){return {
      "message":"user extested"
     } };
     console.log("ggdgd");
    console.log(createLoginDto.password);

     console.log(createLoginDto.username);

    var user= await this.signUpModel.create(createLoginDto);

    return   user.save();

  }

  async login(signupDto: CreateLoginDto) {
    var username= await this.signUpModel.findOne({username:signupDto.username});
    var password= await this.signUpModel.findOne({password:signupDto.password});
    
    if(!username){
      return {"message":"User doen't exist"}
    } else if(!password){
      return {"message":"Password mismatch"}
    } 

    const payload = { username: username.username, password: username.password };
    return {
      access_token: await this.jwtService.signAsync(payload),
      'message': "Login Success"
    };
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
