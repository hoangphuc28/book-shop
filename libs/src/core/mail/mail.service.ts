import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'fs';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL.HOST'), // Replace with your SMTP server
      port: this.configService.get('MAIL.PORT'),
      secure: this.configService.get('MAIL.SECURE'), // true for 465, false for other ports
      auth: {
        user: this.configService.get('MAIL.USER'), // Replace with your email
        pass: this.configService.get('MAIL.PASS'),    // Replace with your email password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get('MAIL.USER'),
      to: to,
      subject: subject,
      text: text,
      html: html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

}
