import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
 
import { Model } from 'mongoose';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  
  @InjectModel(Profile.name) private profile: Model<Profile>;

  
  async profileDto(createProfileDto: CreateProfileDto) {
    var profile= await this.profile.create( createProfileDto);

    return  profile.save();
  }

  async getAllProgile() {
    var profileAll= await this.profile.find();
    if(profileAll)
      return profileAll;
 
    // return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
