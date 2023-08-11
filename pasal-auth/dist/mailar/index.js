"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("./config");
function sendMail({ from, to, subject, text, html }) {
    var transport = nodemailer_1.default.createTransport({
        host: config_1.nodeMailerConfig.host,
        port: config_1.nodeMailerConfig.port,
        auth: {
            user: config_1.nodeMailerConfig.user,
            pass: config_1.nodeMailerConfig.pass,
        },
    });
    return new Promise((resolve, reject) => {
        transport.sendMail({ from, to, subject, text, html }, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(info);
        });
    });
}
exports.sendMail = sendMail;
//# sourceMappingURL=index.js.map