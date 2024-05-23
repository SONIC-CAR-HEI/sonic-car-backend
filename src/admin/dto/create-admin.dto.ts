import { IsEmail } from "class-validator";

export class CreateAdminDto {
    firstName: string;
    lastName: string;
    @IsEmail()
    email: string;
    password: string;
}
