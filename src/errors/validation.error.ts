/**
 * Validation error.
 */

import * as TEXT from '../constants/text.constant';
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @class ValidationError
 * @classdesc 400 -> There is a problem with the request. This error often occurs inside the error, so code is meaningless
 * @example new ValidationError('Error message')
 * @example new ValidationError(new Error())
 */
export class ValidationError extends HttpException {
  constructor(error?: any) {
    super(error || TEXT.VALIDATION_ERROR_DEFAULT, HttpStatus.BAD_REQUEST);
  }
}