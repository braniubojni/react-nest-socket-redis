import { IsEmail, IsString, Length, Max, Min } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsEmail()
  email: string;

  @Length(8, 40)
  password: string;
}
