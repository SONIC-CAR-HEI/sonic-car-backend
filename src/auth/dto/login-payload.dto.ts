import { IsEmail } from "class-validator";

export class LoginPayloadDto {
    @IsEmail()
    email: string;
    password: string;
}
