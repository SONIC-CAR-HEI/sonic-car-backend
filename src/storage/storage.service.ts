import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { CarImageService } from "../car-image/car-image.service";
import { SupabaseClientService } from "../supabase-client/supabase-client.service";
import * as process from "node:process";

@Injectable()
export class StorageService {
    private readonly logger = new Logger(StorageService.name);
    constructor(
        private readonly httpService: HttpService,
        private readonly carImageService: CarImageService,
        private readonly supabase: SupabaseClientService,
    ) {}

    async saveCarImage(
        carId: string,
        fileName: string,
        carImage: Buffer,
        mimeType: string,
    ) {
        if (mimeType.split("/")[0] !== "image") {
            throw new BadRequestException("Unsupported file format");
        }

        const result = await this.supabase.client.storage
            .from(process.env.CAR_IMAGE_BUCKET_NAME)
            .upload(`${carId}/${fileName}`, carImage, {
                upsert: true,
                contentType: mimeType,
            });

        if (result.error) {
            this.logger.error(
                "Error while uploading image: " + result.error.message,
            );
        } else {
            this.logger.log("File upload complete");
        }

        return result;
    }
}
