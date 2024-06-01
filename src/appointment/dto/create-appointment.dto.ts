import { AppointmentStatus } from "@prisma/client";

export class CreateAppointmentDto {
    status: AppointmentStatus;
    firstName: string;
    lastName: string;
    email: string;
    tel: string | null;
    message: string;
    date: Date = new Date();
    carId: string;
}
