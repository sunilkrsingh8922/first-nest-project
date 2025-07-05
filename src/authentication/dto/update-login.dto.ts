import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisterDto } from './create-login.dto';

export class UpdateLoginDto extends PartialType(CreateRegisterDto) {}
