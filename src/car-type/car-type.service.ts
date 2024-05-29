import { Injectable } from "@nestjs/common";
import { CreateCarTypeDto } from "./dto/create-car-type.dto";
import { UpdateCarTypeDto } from "./dto/update-car-type.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CarTypeService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createCarTypeDto: CreateCarTypeDto) {
        return this.prismaService.type.create({
            data: {
                ...createCarTypeDto,
            },
        });
    }

    findAll() {
        return this.prismaService.type.findMany();
    }

    findOne(id: string) {
        return this.prismaService.type.findUnique({
            where: {
                id,
            },
        });
    }

    update(id: string, updateCarTypeDto: UpdateCarTypeDto) {
        return this.prismaService.type.update({
            data: {
                ...updateCarTypeDto,
            },
            where: {
                id,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.type.delete({
            where: {
                id,
            },
        });
    }
}
