import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateRegisterDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    useremail:string;

    @ApiProperty({ example: 'john' })
    @IsNotEmpty()
    username:string;

    
    @ApiProperty({ example: 'password123', minLength: 6 })
    @MinLength(6)
    password:string
}
