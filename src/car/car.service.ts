import { Injectable } from "@nestjs/common";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { PrismaService } from "../prisma/prisma.service";
import { SearchParamDto } from "./dto/search-param.dto";
import { EngineType } from "@prisma/client";

@Injectable()
export class CarService {
    constructor(private readonly prismaService: PrismaService) {}

    async performSearch({
        query,
        minPrice,
        maxPrice,
        motor,
        type,
        brand,
    }: SearchParamDto) {
        const filters = [];
        if (query) {
            filters.push({
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { model: { contains: query, mode: "insensitive" } },
                ],
            });
        }
        if (minPrice && minPrice > 0) {
            filters.push({ price: { gte: +minPrice } });
        }
        if (maxPrice && maxPrice > 0 && minPrice && maxPrice > minPrice) {
            filters.push({ price: { lte: +maxPrice } });
        }
        if (motor) {
            filters.push({ engineType: motor as EngineType });
        }
        if (type) {
            filters.push({ typeId: type });
        }
        if (brand) {
            filters.push({ brandId: brand });
        }
        return this.prismaService.car.findMany({
            where: {
                AND: filters,
            },
        });
    }

    async create(createCarDto: CreateCarDto) {
        return this.prismaService.car.create({
            data: {
                ...createCarDto,
                price: +createCarDto.price,
                power: +createCarDto.power,
                placeNumber: +createCarDto.placeNumber,
                fav: !!createCarDto.fav,
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

    removeMayIds(ids: string[]) {
        return this.prismaService.car.deleteMany({
            where: {
                id: {
                    in: ids,
                },
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

    findFavorites() {
        return this.prismaService.car.findMany({
            where: {
                fav: true,
            },
        });
    }
}
