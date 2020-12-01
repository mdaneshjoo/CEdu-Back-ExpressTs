import ServerError from "../errors/serverError";
import * as email from "nodemailer";
import configs from "../configs/config";
import { emailOptions } from "../interfaces/Email.interface";
import { sMessages } from "../utils/constants/SMessages";
import { welcome } from "../utils/Email/templates/signupWelcome";
import emailMessages from '../utils/Email/messages'
export default class Email {
  private sendMail(options: emailOptions) {
    options.from = options.from ? options.from : configs.email.from;
    email
      .createTransport(configs.email.smtpConfig)
      .sendMail(options, (e, info) => {
        if (e) throw new ServerError(e);
      });
  }

  sendRegisterationEmail(email) {
    if (email) this.sendMail({
      to: email,
      subject: emailMessages.REG_WELCOME.subject,
      html: welcome(null, null, null, null, emailMessages.REG_WELCOME.message),
    })
  }
}
