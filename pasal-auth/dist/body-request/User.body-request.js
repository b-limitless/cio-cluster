"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBodyRequest = void 0;
const express_validator_1 = require("express-validator");
exports.UserBodyRequest = [
    express_validator_1.body('email').isEmail().withMessage('Email must be valid'),
    express_validator_1.body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 to 20 characters'),
    express_validator_1.body('role').trim().notEmpty().withMessage('Role must not be empty'),
    express_validator_1.body('permissions')
        .isArray({ min: 1 })
        .withMessage('Please provide at least one permission to the user'),
];
//# sourceMappingURL=User.body-request.js.map