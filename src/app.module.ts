import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './authentication/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [LoginModule,MongooseModule.forRoot('mongodb+srv://sunilanddeveloper:Sunil8922@cluster0.nvvbt6u.mongodb.net/user'), ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
