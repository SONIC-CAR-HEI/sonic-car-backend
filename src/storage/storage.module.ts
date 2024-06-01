import { forwardRef, Module } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { HttpModule } from "@nestjs/axios";
import { CarImageModule } from "../car-image/car-image.module";
import { SupabaseClientService } from "../supabase-client/supabase-client.service";

@Module({
    imports: [
        HttpModule.register({
            baseURL: process.env.BUCKET_URL,
        }),
        forwardRef(() => CarImageModule),
    ],
    providers: [StorageService, SupabaseClientService],
    exports: [StorageService],
})
export class StorageModule {}
