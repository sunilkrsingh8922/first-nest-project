import { Express } from 'express';
import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  UseGuards,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { AuthGuard } from 'src/authentication/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger/dist/decorators';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { Req } from '@nestjs/common';

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
  getProfile(@Req() req) {
    // req.user was added in AuthGuard after verifying JWT
    return this.profileService.getAllProfiles();
    // return this.profileService.findById(req.user.sub).select('-password');
  }

  @ApiBearerAuth('authorization')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization') 
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (req, file, cb) => {
          // Temporary filename
          cb(null, `temp-${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )

  uploadProfileImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) return { message: 'No file uploaded' };

    return {
      message: 'Image uploaded successfully', 
      filename: file.filename,
      path: `/profile/image/${file.filename}`,
    };
  }

  @Get('image/:filename')
  getProfileImage(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads/profile' });
  }
}
