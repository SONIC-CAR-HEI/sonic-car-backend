import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { PrismaService } from "../prisma/prisma.service";
import { omit } from "../utils/object.utils";
import { CryptoService } from "../crypto/crypto.service";

const disablePasswordOutput = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    password: false,
};

@Injectable()
export class AdminService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly cryptoService: CryptoService,
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        return omit(
            await this.prismaService.admin.create({
                data: {
                    ...createAdminDto,
                    password: await this.cryptoService.crypt(
                        createAdminDto.password,
                    ),
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

    async update(id: string, updateAdminDto: UpdateAdminDto) {
        return omit(
            await this.prismaService.admin.update({
                data: {
                    ...updateAdminDto,
                },
                where: {
                    id,
                },
            }),
            ["password"],
        );
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

    async findByEmail(email: string) {
        return this.prismaService.admin.findFirst({
            where: {
                email,
            },
        });
    }
}
