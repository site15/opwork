import type { ExtendedFormApi } from '@vben/common-ui';

export type ValidationErrorItem = {
  constraints?: Record<string, string>;
  property?: string;
};

export const applyBackendValidationErrors = (
  formApi: ExtendedFormApi,
  error: unknown,
) => {
  const maybeError = error as {
    code?: string;
    errors?: ValidationErrorItem[];
    message?: string;
    metadata?: {
      errors?: ValidationErrorItem[];
    };
  };

  const backendErrors =
    maybeError?.errors ??
    maybeError?.metadata?.errors ??
    (maybeError as { error?: { errors?: ValidationErrorItem[] } })?.error
      ?.errors ??
    [];

  if (maybeError?.code !== 'VALIDATION_ERROR' || backendErrors.length === 0) {
    return false;
  }

  backendErrors.forEach((item) => {
    if (!item?.property) {
      return;
    }

    let firstError = Object.values(item.constraints ?? {})[0];
    if (!firstError) {
      return;
    }

    for (const field of formApi.store.state.schema ?? []) {
      firstError = firstError?.replace(field.fieldName, `"${field.label}"`);
    }

    formApi.form.setFieldError(item.property, firstError);
  });

  formApi.scrollToFirstError(
    backendErrors[0]?.property ? { [backendErrors[0].property]: true } : {},
  );

  return true;
};

export function clearBackendValidationErrors(formApi: ExtendedFormApi) {
  for (const field of formApi.store.state.schema ?? []) {
    formApi.form.setFieldError(field.fieldName, undefined);
  }
}
