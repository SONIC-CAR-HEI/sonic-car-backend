import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { AppointmentStatus } from "@prisma/client";

@Controller("appointment")
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Post()
    create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @Get()
    findAll() {
        return this.appointmentService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.appointmentService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto,
    ) {
        return this.appointmentService.update(id, updateAppointmentDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.appointmentService.remove(id);
    }

    @Post(":id")
    updateStatus(
        @Param("id") id: string,
        @Query("status") status: AppointmentStatus,
    ) {
        return this.appointmentService.changeAppointmentStatus(id, status);
    }
}
