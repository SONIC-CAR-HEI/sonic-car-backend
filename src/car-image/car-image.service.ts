import { Injectable } from "@nestjs/common";
import { CreateCarImageDto } from "./dto/create-car-image.dto";
import { UpdateCarImageDto } from "./dto/update-car-image.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CarImageService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createCarImageDto: CreateCarImageDto, fileExtension: string) {
        const imageUrl = `${process.env.BUCKET_URL}/object/public/${process.env.CAR_IMAGE_BUCKET_NAME}/${createCarImageDto.carId}/${createCarImageDto.imageUrl}${fileExtension}`;
        return this.prismaService.image.create({
            data: {
                ...createCarImageDto,
                imageUrl,
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

    findManyIds(ids: string[]) {
        return this.prismaService.car.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    deleteManyIds(ids: string[]) {
        return this.prismaService.image.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }
}
