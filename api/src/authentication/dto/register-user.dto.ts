import { IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(4, 64)
  username: string;

  @IsString()
  @Length(6, 64)
  password: string;

  @IsString()
  @Length(4, 64)
  name: string;

  @IsString()
  @Length(4, 64)
  email: string;
}
