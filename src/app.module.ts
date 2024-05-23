import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { CarModule } from "./car/car.module";
import { AppointmentModule } from "./appointment/appointment.module";

@Module({
    imports: [CarModule, AppointmentModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
