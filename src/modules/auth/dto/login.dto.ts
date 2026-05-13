import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O e-mail informado é inválido.' })
  email!: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password!: string;
}
