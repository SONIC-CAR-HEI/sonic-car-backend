import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    UseInterceptors,
    BadRequestException,
    UploadedFile,
    Logger,
} from "@nestjs/common";
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { SearchParamDto } from "./dto/search-param.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { JwtAuthGuard } from "../auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { SupabaseClientService } from "../supabase-client/supabase-client.service";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import * as path from "node:path";
import { CarImageService } from "../car-image/car-image.service";

@Controller("car")
export class CarController {
    private readonly logger = new Logger(CarController.name);
    constructor(
        private readonly carService: CarService,
        private readonly supabaseClientService: SupabaseClientService,
        private readonly carImageService: CarImageService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Delete("ids")
    deleteManyIds(@Query("ids") ids: string[]) {
        return this.carService.removeMayIds(ids);
    }

    @UseGuards(JwtAuthGuard)
    @Get("ids")
    findManyIds(@Query("ids") ids: string[]) {
        return this.carService.findManyIds(ids);
    }

    @Get("search")
    search(@Query() query: SearchParamDto) {
        return this.carService.performSearch(query);
    }

    @Get("fav")
    favorites() {
        return this.carService.findFavorites();
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor("image", {
            limits: {
                fileSize: 5000000,
            },
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(png|jpeg|jpg)/)) {
                    callback(
                        new BadRequestException(
                            "Wrong filetype. Please upload an image file",
                        ),
                        false,
                    );
                }
                callback(undefined, true);
            },
        }),
    )
    @Post()
    async create(
        @Body() createCarDto: CreateCarDto,
        @UploadedFile() image: Express.Multer.File,
    ) {
        const newCar = await this.carService.create(createCarDto);
        if (image) {
            this.logger.log("Treating image upload of " + image.originalname);
            const fileExtension = path.extname(image.originalname);
            this.logger.log("Detected image extension: " + fileExtension);
            const imageKey = uuid();
            this.logger.log("Generated uuid " + imageKey);
            const savedImageName = imageKey + fileExtension;
            this.logger.log("Saved image name: " + savedImageName);
            const extArr = fileExtension.split("");
            extArr.shift();
            const mimeType = `image/${extArr.join("")}`;
            const fileBuffer = image.buffer;
            const res = await this.supabaseClientService.client.storage
                .from(process.env.CAR_IMAGE_BUCKET_NAME)
                .upload(
                    `${newCar.id}/${imageKey}${fileExtension}`,
                    fileBuffer,
                    {
                        upsert: true,
                        contentType: mimeType,
                    },
                );
            if (res.data.path) {
                const imageUrl = `${process.env.BUCKET_URL}/object/public/${process.env.CAR_IMAGE_BUCKET_NAME}/${res.data.path}`;
                this.carImageService.create({
                    imageUrl,
                    carId: newCar.id,
                });
            }
        }
        return newCar;
    }

    @Get()
    findAll() {
        return this.carService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.carService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor("image", {
            limits: {
                fileSize: 5000000,
            },
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(png|jpeg|jpg)/)) {
                    callback(
                        new BadRequestException(
                            "Wrong filetype. Please upload an image file",
                        ),
                        false,
                    );
                }
                callback(undefined, true);
            },
        }),
    )
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateCarDto: UpdateCarDto,
        @UploadedFile() image: Express.Multer.File,
    ) {
        const newCar = await this.carService.update(id, updateCarDto);
        if (image) {
            this.logger.log("Treating image upload of " + image.originalname);
            const fileExtension = path.extname(image.originalname);
            this.logger.log("Detected image extension: " + fileExtension);
            const imageKey = uuid();
            this.logger.log("Generated uuid " + imageKey);
            const savedImageName = imageKey + fileExtension;
            this.logger.log("Saved image name: " + savedImageName);
            const extArr = fileExtension.split("");
            extArr.shift();
            const mimeType = `image/${extArr.join("")}`;
            const fileBuffer = image.buffer;
            const res = await this.supabaseClientService.client.storage
                .from(process.env.CAR_IMAGE_BUCKET_NAME)
                .upload(
                    `${newCar.id}/${imageKey}${fileExtension}`,
                    fileBuffer,
                    {
                        upsert: true,
                        contentType: mimeType,
                    },
                );
            if (res.data.path) {
                const imageUrl = `${process.env.BUCKET_URL}/object/public/${process.env.CAR_IMAGE_BUCKET_NAME}/${res.data.path}`;
                this.carImageService.create({
                    imageUrl,
                    carId: newCar.id,
                });
            }
        }
        return newCar;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.carService.remove(id);
    }
}
