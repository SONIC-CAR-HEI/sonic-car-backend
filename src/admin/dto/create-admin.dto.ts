import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class CreateAdminDto {
    @MinLength(3)
    firstName: string;
    @MinLength(3)
    lastName: string;
    @IsEmail()
    email: string;
    @IsStrongPassword({
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 0,
        minSymbols: 0,
        minLength: 8,
    })
    password: string;
}
