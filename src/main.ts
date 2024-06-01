import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const openApiConfig = new DocumentBuilder()
        .setTitle("SONIC Car Dealer API")
        .setDescription("API specs for the Sonic Car Dealer app")
        .setVersion("0.6.0")
        .build();

    const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);
    SwaggerModule.setup("specs", app, openApiDocument);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
}
bootstrap();
