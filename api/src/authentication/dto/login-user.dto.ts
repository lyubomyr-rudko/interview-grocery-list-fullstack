import { IsString, Length } from 'class-validator'

export class LoginUserDto {
  @IsString()
  @Length(4, 64)
  username: string

  @IsString()
  @Length(6, 64)
  password: string
}
