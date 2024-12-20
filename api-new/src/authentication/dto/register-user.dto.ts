import { IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(4, 12)
  username: string;

  @IsString()
  @Length(6, 12)
  password: string;

  @IsString()
  @Length(4, 12)
  name: string;

  @IsString()
  @Length(4, 12)
  email: string;
}
