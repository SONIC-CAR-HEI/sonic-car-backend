import { EngineType } from "@prisma/client";

export class CreateCarDto {
    brand: string;
    model: string;
    price: number;
    fav: boolean | null;
    available: boolean | null;
    typeId: string;
    engineType: EngineType;
}
