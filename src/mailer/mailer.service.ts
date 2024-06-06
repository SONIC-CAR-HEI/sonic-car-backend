import { Injectable } from "@nestjs/common";
import * as process from "node:process";
import { Transporter, createTransport } from "nodemailer";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";

@Injectable()
export class MailerService {
    private readonly transport: Transporter<SentMessageInfo>;
    private readonly emailAdmin = process.env["PRIMARY_ADMIN_EMAIL"];

    constructor() {
        this.transport = createTransport({
            service: "Gmail",
            auth: {
                user: this.emailAdmin,
                pass: process.env["ADMIN_EMAIL_APP_PASSWORD"],
            },
        });
    }

    async sendMail(emailFrom: string, subject: string, message: string) {
        return await this.transport.sendMail({
            from: emailFrom,
            subject,
            envelope: { from: emailFrom, to: this.emailAdmin },
            text: `Hello, it\'s ${emailFrom}\n\n${message}`,
        });
    }
}
