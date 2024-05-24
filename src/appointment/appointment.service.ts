import { Injectable } from "@nestjs/common";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { PrismaService } from "../prisma/prisma.service";
import { AppointmentStatus } from "@prisma/client";

@Injectable()
export class AppointmentService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createAppointmentDto: CreateAppointmentDto) {
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
