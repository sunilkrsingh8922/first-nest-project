// login.dto.ts
import { PickType } from '@nestjs/swagger';
import { CreateRegisterDto } from './create-login.dto';

export class LoginDto extends PickType(CreateRegisterDto, ['useremail', 'password'] as const) {}
