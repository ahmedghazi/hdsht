export async function useSanityData<T>(
  query: string,
  params?: Record<string, unknown>,
) {
  // Access `data` (the standaloneRef updated by live subscriptions) from the
  // promise object BEFORE awaiting. Awaiting resolves to the AsyncData object
  // whose `.data` ref is NOT updated by live query snapshots, so we must grab
  // the standaloneRef synchronously first.
  const queryResult = useSanityQuery<T>(query, params);
  const data = queryResult.data as Ref<T | null>;
  await queryResult;
  return { data, refresh: queryResult.refresh };
}
