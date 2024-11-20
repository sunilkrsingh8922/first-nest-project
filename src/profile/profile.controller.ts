import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/authentication/auth.guard';

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.profileDto(createProfileDto);
  }

  @UseGuards(AuthGuard)
  @Get("")
  findAll() {
    return this.profileService.getAllProgile();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
