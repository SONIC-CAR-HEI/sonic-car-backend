import { Body, Controller, Post } from "@nestjs/common";
import { MailerService } from "../mailer/mailer.service";
import { ContactDto } from "./DTO/contact.dto";

@Controller("contact")
export class ContactController {
    constructor(private readonly mailer: MailerService) {}

    @Post()
    sendMail(@Body() data: ContactDto) {
        return this.mailer.sendMail(
            data.email,
            `CONTACT - ${data.name}`,
            data.message,
        );
    }
}
