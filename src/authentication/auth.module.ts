import { Module } from '@nestjs/common';
import { LoginService } from './auth.service';
import { LoginController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Login, LoginSchema } from './entities/login.entity';

@Module({imports:[MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema,  }, ]), JwtModule.register({
  global: true,
  secret: 'sunil',
  // signOptions: { expiresIn: '60s' },
}),], 
  controllers: [LoginController,],
  providers: [LoginService],
})
export class LoginModule {}
