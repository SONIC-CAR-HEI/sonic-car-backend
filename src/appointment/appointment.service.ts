import { Injectable } from "@nestjs/common";
import { AppointmentStatus } from "@prisma/client";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from "../mailer/mailer.service";

@Injectable()
export class AppointmentService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mailerService: MailerService,
    ) {}

    async create(createAppointmentDto: CreateAppointmentDto) {
        await this.mailerService.sendMail(
            createAppointmentDto.email,
            `APPOINTMENT - ${createAppointmentDto.firstName} ${createAppointmentDto.lastName} - CAR #${createAppointmentDto.carId}`,
            createAppointmentDto.message,
        );
        return this.prismaService.appointment.create({
            data: {
                ...createAppointmentDto,
            },
        });
    }

    findAll() {
        return this.prismaService.appointment.findMany();
    }

    findOne(id: string) {
        return this.prismaService.appointment.findFirst({
            where: {
                id,
            },
        });
    }

    update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
        return this.prismaService.appointment.update({
            data: {
                ...updateAppointmentDto,
            },
            where: {
                id,
            },
        });
    }

    changeAppointmentStatus(id: string, status: AppointmentStatus) {
        return this.prismaService.appointment.update({
            data: {
                status,
            },
            where: {
                id,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.appointment.delete({
            where: {
                id,
            },
        });
    }
}
