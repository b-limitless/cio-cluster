"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamBodyRequest = void 0;
const User_body_request_1 = require("./User.body-request");
const express_validator_1 = require("express-validator");
exports.TeamBodyRequest = [
    express_validator_1.body('firstName').isString().notEmpty().withMessage('First name must be a non-empty string'),
    express_validator_1.body('lastName').isString().notEmpty().withMessage('Last name must be a non-empty string'),
    ...User_body_request_1.UserBodyRequest
];
//# sourceMappingURL=Team.body-request.js.map