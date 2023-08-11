"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCBodyRequest = void 0;
const express_validator_1 = require("express-validator");
exports.KYCBodyRequest = [
    express_validator_1.body('industry')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Please provide at least one industry'),
    express_validator_1.body('employeeCount')
        .optional()
        .isInt({ min: 1, max: 10000 })
        .withMessage('Employee count must be a positive integer'),
    express_validator_1.body('targetMarket').optional().isArray().withMessage('Target market must be an array'),
    express_validator_1.body('currentWorkFlow').optional().trim().notEmpty().withMessage('Current workflow must not be empty'),
    express_validator_1.body('currentSoftware').optional().trim().notEmpty().withMessage('Current software must not be empty'),
    express_validator_1.body('painPoint').optional().trim().notEmpty().withMessage('Pain point must not be empty'),
    express_validator_1.body('requirements').optional().trim().notEmpty().withMessage('Requirements must not be empty'),
    express_validator_1.body('trainingAndSupport').optional().trim().notEmpty().withMessage('Training and support must not be empty'),
];
//# sourceMappingURL=KYC.body-request.js.map