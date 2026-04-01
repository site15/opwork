import { ValidationError as CvValidationError } from 'class-validator';

export class ValidationErrorMetadataConstraint {
  name!: string;
  description!: string;

  constructor(options?: ValidationErrorMetadataConstraint) {
    Object.assign(this, options);
  }
}

export class ValidationErrorMetadata {
  property!: string;
  constraints!: ValidationErrorMetadataConstraint[];
  children?: ValidationErrorMetadata[];

  constructor(options?: ValidationErrorMetadata) {
    Object.assign(this, options);
  }
}

export class ValidationError extends Error {
  public errors?: CvValidationError[];

  constructor(errors?: CvValidationError[]) {
    super();
    this.errors = errors;
  }
}
