import { body, param, query } from 'express-validator'
import { LEAD_STATUSES } from '../utils/constants.js'

export const listLeadsValidation = [
  query('search').optional().trim().isLength({ max: 100 }),
  query('status')
    .optional()
    .trim()
    .isIn(LEAD_STATUSES)
    .withMessage('Status must be NEW, CONTACTED, or CLOSED'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be between 1 and 50')
    .toInt(),
]

export const updateLeadStatusValidation = [
  param('id').trim().notEmpty().withMessage('Lead id is required'),
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(LEAD_STATUSES)
    .withMessage('Status must be NEW, CONTACTED, or CLOSED'),
]
