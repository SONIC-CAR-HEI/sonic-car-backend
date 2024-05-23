import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PrismaService } from "../prisma/prisma.service";
import { omit } from "../utils/object.utils";

const disablePasswordOutput = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    password: false,
};

@Injectable()
export class AdminService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createAdminDto: CreateAdminDto) {
        return omit(
            await this.prismaService.admin.create({
                data: {
                    ...createAdminDto,
                },
            }),
            ["password"],
        );
    }

    findAll() {
        return this.prismaService.admin.findMany({
            select: disablePasswordOutput,
        });
    }

    findOne(id: string) {
        return this.prismaService.admin.findFirst({
            where: {
                id,
            },
            select: disablePasswordOutput,
        });
    }

    update(id: string, updateAdminDto: UpdateAdminDto) {
        return this.prismaService.admin.update({
            data: {
                ...updateAdminDto,
            },
            where: {
                id,
            },
        });
    }

    async remove(id: string) {
        return omit(
            await this.prismaService.admin.delete({
                where: {
                    id,
                },
            }),
            ["password"],
        );
    }
}
