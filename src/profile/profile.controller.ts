import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import { Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { ApiParam } from '@nestjs/swagger/dist/decorators';

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization') 
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.profileDto(createProfileDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization') 
  @Get()
  getProfile(@Request() req) {
    // req.user was added in AuthGuard after verifying JWT
    return this.profileService.getAllProfiles();
    // return this.profileService.findById(req.user.sub).select('-password');
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Get(':id')
  @ApiParam({ name: 'id', description: 'User profile ID' })
  getProfileById(@Param('id') id: string) {
    return this.profileService.findById(id);
  }
 
}
