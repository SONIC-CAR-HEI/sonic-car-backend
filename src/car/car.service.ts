import { Injectable } from "@nestjs/common";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CarService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createCarDto: CreateCarDto) {
        return this.prismaService.car.create({
            data: {
                ...createCarDto,
            },
        });
    }

    async findAll() {
        return this.prismaService.car.findMany();
    }

    async findOne(id: string) {
        return this.prismaService.car.findFirst({
            where: {
                id,
            },
        });
    }

    async update(id: string, updateCarDto: UpdateCarDto) {
        return this.prismaService.car.update({
            where: {
                id,
            },
            data: {
                ...updateCarDto,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.car.delete({
            where: {
                id,
            },
        });
    }
}
