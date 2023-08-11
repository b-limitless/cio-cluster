"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationBodyRequest = void 0;
const express_validator_1 = require("express-validator");
exports.VerificationBodyRequest = [
    express_validator_1.body("verificationCode")
        .isLength({ min: 5 })
        .withMessage("Vericiation code is required"),
];
//# sourceMappingURL=Verification.body-request.js.map