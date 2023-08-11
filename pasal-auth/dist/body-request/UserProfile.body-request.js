"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileBodyRequest = void 0;
const express_validator_1 = require("express-validator");
exports.UserProfileBodyRequest = [
    express_validator_1.body('firstName').optional().isString().notEmpty().withMessage('First name must be a non-empty string'),
    express_validator_1.body('lastName').optional().isString().notEmpty().withMessage('Last name must be a non-empty string'),
    express_validator_1.body('country').optional().isString().notEmpty().withMessage('Country must be a non-empty string'),
    express_validator_1.body('spokenLanguage').optional().isArray({ min: 1 }).withMessage('Please provide at least one spoken language'),
    express_validator_1.body('about').optional().isString().notEmpty().withMessage('About must be a non-empty string'),
    express_validator_1.body('profileImageLink').optional().isString().notEmpty().withMessage('Profile image link must be a non-empty string'),
];
//# sourceMappingURL=UserProfile.body-request.js.map