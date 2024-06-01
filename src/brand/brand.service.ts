import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BrandService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createBrandDto: CreateBrandDto) {
        return this.prismaService.brand.create({
            data: {
                ...createBrandDto,
            },
        });
    }

    findAll() {
        return this.prismaService.brand.findMany();
    }

    findOne(id: string) {
        return this.prismaService.brand.findUnique({
            where: {
                id,
            },
        });
    }

    update(id: string, updateBrandDto: UpdateBrandDto) {
        return this.prismaService.brand.update({
            where: {
                id,
            },
            data: {
                ...updateBrandDto,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.brand.delete({
            where: {
                id,
            },
        });
    }
}
