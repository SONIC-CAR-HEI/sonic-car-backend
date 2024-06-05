import { Module } from "@nestjs/common";
import { MailerModule } from "../mailer/mailer.module";
import { ContactController } from "./contact.controller";

@Module({
    imports: [MailerModule],
    controllers: [ContactController],
})
export class ContactModule {}
