export function unwrap<T>(
  result: { data: T; error: any },
  defaultMessage: string,
) {
  if (result?.error || !result.data) {
    throw Object.assign(
      new Error(result.error?.error || defaultMessage),
      result.error,
    );
  }
  return result.data as NonNullable<T>;
}
