import { AppointmentStatus } from "@prisma/client";
import { IsEmail } from "class-validator";

export class CreateAppointmentDto {
    status: AppointmentStatus | null;
    firstName: string;
    lastName: string;
    @IsEmail()
    email: string;
    tel: string | null;
    message: string;
    date: Date = new Date();
    carId: string;
}
