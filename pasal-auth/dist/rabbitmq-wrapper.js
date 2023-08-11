"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQWrapper = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const logger_1 = __importDefault(require("./logger"));
class RabbitMQWrapper {
    get client() {
        if (!this._client) {
            let msg = "Rabbit MQ client is not avaialble";
            logger_1.default.log({
                level: 'error',
                message: msg
            });
            throw new Error(msg);
        }
        return this._client;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!process.env.RABBIT_MQ_URL) {
                    let msg = "Rabbit MQ url is not provided";
                    logger_1.default.log({
                        level: 'error',
                        message: msg
                    });
                    throw new Error(msg);
                }
                this._connnection = yield amqplib_1.default.connect(process.env.RABBIT_MQ_URL);
                this._connnection.on("close", () => {
                    logger_1.default.log({
                        level: 'info',
                        message: "Connection to RabbitMQ is closed"
                    });
                    this._client = undefined;
                });
                this._client = yield this._connnection.createChannel();
                logger_1.default.log({
                    level: 'info',
                    message: 'connected to Rabbit'
                });
            }
            catch (err) {
                logger_1.default.log({
                    level: 'error',
                    message: `Failed to connect to Rabbit MQ ${err}`,
                });
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._client) {
                    yield this._client.close();
                }
                if (this._connnection) {
                    yield this._connnection.close();
                }
                logger_1.default.log({
                    level: 'info',
                    message: "Disconnected from Rabbit MQ"
                });
            }
            catch (err) {
                logger_1.default.log({
                    level: 'info',
                    message: `Error while closing Rabbit MQ connection ${err}`
                });
            }
        });
    }
}
exports.rabbitMQWrapper = new RabbitMQWrapper();
//# sourceMappingURL=rabbitmq-wrapper.js.map