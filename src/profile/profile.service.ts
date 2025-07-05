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

  async getAllProfiles() {
    try {
      const profiles = await this.profile.find().select('-password'); // ✅ optionally exclude sensitive fields
      if (!profiles.length) {
        return { message: 'No profiles found' };
      }
      return profiles;
    } catch (error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`);
    }
  }

  async findById(id: string) {
    try {
      const profile = await this.profile.findById(id).select('-password'); // Exclude password
      if (!profile) {
        return { message: 'Profile not found' };
      }
      return profile;
    } catch (error) {
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
