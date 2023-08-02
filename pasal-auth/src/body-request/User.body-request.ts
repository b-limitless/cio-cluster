import { body } from "express-validator";

export const UserBodyRequest = [
      body('email').isEmail().withMessage('Email must be valid'),
      body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 to 20 characters'),
      body('role').trim().notEmpty().withMessage('Role must not be empty'),
      body('permissions')
        .isArray({ min: 1 })
        .withMessage('Please provide at least one permission to the user'),
      body('industry')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Please provide at least one industry'),
      body('employeeCount')
        .optional()
        .isInt({ min: 1, max:10000 })
        .withMessage('Employee count must be a positive integer'),
      body('targetMarket').optional().isArray().withMessage('Target market must be an array'),
      body('currentWorkFlow').optional().trim().notEmpty().withMessage('Current workflow must not be empty'),
      body('currentSoftware').optional().trim().notEmpty().withMessage('Current software must not be empty'),
      body('painPoint').optional().trim().notEmpty().withMessage('Pain point must not be empty'),
      body('requirements').optional().trim().notEmpty().withMessage('Requirements must not be empty'),
      body('trainingAndSupport').optional().trim().notEmpty().withMessage('Training and support must not be empty'),
];