import { body } from 'express-validator'
import { BUDGET_RANGES } from '../utils/constants.js'

export const createLeadValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('budget')
    .trim()
    .notEmpty()
    .withMessage('Budget range is required')
    .isIn(BUDGET_RANGES)
    .withMessage('Select a valid budget range'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
]
