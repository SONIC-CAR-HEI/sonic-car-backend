import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            "https://concessionnaire-kohl.vercel.app",
            "http://localhost:3001",
        ],
        methods: "GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH",
        credentials: true,
        allowedHeaders:
            "Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma",
    });

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
