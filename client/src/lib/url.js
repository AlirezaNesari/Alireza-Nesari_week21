
export function buildUrl(pathname, searchParams, updates) {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    const isEmpty = value === undefined || value === null || value === "";

    if (isEmpty) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });

  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
}