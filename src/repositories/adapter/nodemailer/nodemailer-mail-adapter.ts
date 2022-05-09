import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0f8bfe6f4d4e75",
        pass: "b30dc8ef41e02b"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'NLW Return <nlwreturn@rocketseat.com>',
            to: 'Alexandre Fukano <fukanomikio@gmail.com>',
            subject,
            html: body
        })
    }
}