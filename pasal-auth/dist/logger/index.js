"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, prettyPrint } = winston_1.format;
const logger = winston_1.createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [new winston_1.transports.Console()]
});
exports.default = logger;
//# sourceMappingURL=index.js.map