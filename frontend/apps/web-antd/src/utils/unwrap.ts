export function unwrap<T>(result: { data: T; error: any }) {
  if (result?.error || !result.data) {
    throw Object.assign(new Error(result.error?.error), result.error);
  }
  return result.data as NonNullable<T>;
}
