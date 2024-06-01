import { EngineType } from "@prisma/client";

export class CreateCarDto {
    brandId: string;
    model: string;
    price: number;
    placeNumber: number;
    fav: boolean | null;
    available: boolean | null;
    typeId: string;
    engineType: EngineType;
}
