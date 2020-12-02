import ServerError from "../errors/serverError";
import * as email from "nodemailer";
import configs from "../configs/config";
import { emailOptions } from "../interfaces/Email.interface";
import { sMessages } from "../utils/constants/SMessages";
import { welcome } from "../utils/Email/templates/signupWelcome";
import emailMessages from '../utils/Email/messages'
import { report } from "../utils/Email/templates/loginReport";
import * as moment from 'moment'
export default class Email {
  private sendMail(options: emailOptions) {
    options.from = options.from ? options.from : configs.email.from;
    email
      .createTransport(configs.email.smtpConfig)
      .sendMail(options, (e, info) => {
        if (configs.env === 'development') console.log("sending email was", info.response)
        if (e) throw new ServerError(e);
      });
  }
  /**
   * sending email for registreation
   * @param email email sended to this email address
   */
  sendRegisterationEmail(userData: { email: string; username: string; password: string; }) {
    if (userData.email) this.sendMail({
      to: userData.email,
      subject: emailMessages.REG_WELCOME.subject,
      html: welcome({
        email: userData.email,
        username: userData.username,
        password: userData.password,
        message: emailMessages.REG_WELCOME.message
      }),
    })
  }
  /**
   * 
   * @param email 
   * @param {string} ip logind user ip address
   */
  loginReport(_email, ip: string) {
    if (_email)
      this.sendMail({
        to: _email,
        subject: emailMessages.LOGIN_REPORT.subject,
        html: report({ ip, dateTime: moment().format('DD/MMMM/YYYY - H:mm A'), message: emailMessages.LOGIN_REPORT.message })
      })
  }
}