import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
   lastname: string;
   firstname: string;

   @IsNotEmpty()
   username: string;

   @IsNotEmpty()
   password: string;
   email: string;
   phone: string;
   role: string;
}
