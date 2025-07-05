import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './entities/login.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/LoginDto.dto';
import { CreateRegisterDto } from './dto/create-login.dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService
  ) {}

  @InjectModel(Login.name) private signUpModel: Model<Login>;

  async create(createRegisterDto: CreateRegisterDto,) {

    var log= await this.signUpModel.findOne({username:createRegisterDto.username});
    if(log){return {
      "message":"user already exist"
     } }; 
     const hashedPassword = await bcrypt.hash(createRegisterDto.password, 10);
    // var user= await this.signUpModel.create(CreateRegisterDto);
    const newUser = new this.signUpModel({
      ...createRegisterDto,
      password: hashedPassword,
    });
    return   newUser.save();
  }

 async login(loginDto: LoginDto) {
  const user = await this.signUpModel
    .findOne({ useremail: loginDto.useremail })
    .select('+password'); // ✅ include password field if excluded in schema

  // ✅ Check if user exists first
  if (!user) {
    return { message: "User doesn't exist" };
  }

  // ✅ Compare provided password with hashed password
  const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);

  if (!isPasswordMatch) {
    return { message: "Password mismatch" };
  }

  const payload = {
    sub: user._id,
    useremail: user.useremail, // prefer using `user.useremail` directly
  };

  return {
    access_token: await this.jwtService.signAsync(payload),
    message: "Login Success",
  };
}



  async findAll() {
    return await this.signUpModel.find().select('-password');
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      return { message: 'Invalid user ID format' };
    }
    const result = await this.signUpModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return { message: 'User not found or already deleted' };
    }

    return { message: 'User deleted successfully' };
  } 
}
