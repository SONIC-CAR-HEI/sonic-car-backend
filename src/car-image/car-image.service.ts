import { Injectable } from "@nestjs/common";
import { CreateCarImageDto } from "./dto/create-car-image.dto";
import { UpdateCarImageDto } from "./dto/update-car-image.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CarImageService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createCarImageDto: CreateCarImageDto) {
        return this.prismaService.image.create({
            data: {
                ...createCarImageDto,
            },
        });
    }

    findAll() {
        return this.prismaService.image.findMany();
    }

    findOne(id: string) {
        return this.prismaService.image.findUnique({
            where: {
                id,
            },
        });
    }

    update(id: string, updateCarImageDto: UpdateCarImageDto) {
        return this.prismaService.image.update({
            where: {
                id,
            },
            data: {
                ...updateCarImageDto,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.image.delete({
            where: {
                id,
            },
        });
    }

    findByCarId(carId: string) {
        return this.prismaService.image.findMany({
            where: {
                carId,
            },
        });
    }
}
