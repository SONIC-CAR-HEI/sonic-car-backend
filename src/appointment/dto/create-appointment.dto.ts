import { AppointmentStatus } from "@prisma/client";

export class CreateAppointmentDto {
    status: AppointmentStatus;
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    date: Date = new Date();
    carId: string;
}
