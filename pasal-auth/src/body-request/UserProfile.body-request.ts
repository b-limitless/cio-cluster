import { body } from "express-validator";

export const UserProfileBodyRequest = [
  body('firstName').optional().isString().notEmpty().withMessage('First name must be a non-empty string'),
  body('lastName').optional().isString().notEmpty().withMessage('Last name must be a non-empty string'),
  body('country').optional().isString().notEmpty().withMessage('Country must be a non-empty string'),
  body('spokenLanguage').optional().isArray({ min: 1 }).withMessage('Please provide at least one spoken language'),
  body('about').optional().isString().notEmpty().withMessage('About must be a non-empty string'),
  body('profileImageLink').optional().isString().notEmpty().withMessage('Profile image link must be a non-empty string'),
];