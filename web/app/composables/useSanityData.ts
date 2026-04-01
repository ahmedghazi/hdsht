export async function useSanityData<T>(
  query: string,
  params?: Record<string, unknown>,
) {
  // Access `data` (the standaloneRef updated by live subscriptions) from the
  // promise object BEFORE awaiting. Awaiting resolves to the AsyncData object
  // whose `.data` ref is NOT updated by live query snapshots, so we must grab
  // the standaloneRef synchronously first.
  const queryResult = useSanityQuery<T>(query, params)
  const data = queryResult.data as Ref<T | null>
  await queryResult
  return { data, refresh: queryResult.refresh }
}

// export async function useSanityData<T>(
//   query: string,
//   params?: Record<string, unknown>,
// ) {
//   // Access the standaloneRef BEFORE awaiting — it's updated by live subscriptions on CSR.
//   const queryResult = useSanityQuery<T>(query, params);
//   const standaloneRef = queryResult.data as Ref<T | null>;
//   const asyncResult = await queryResult;

//   // On SSR, live subscriptions never fire so standaloneRef stays null.
//   // Sync from asyncResult so the page has data on first render / refresh.
//   if (!standaloneRef.value && asyncResult.data.value) {
//     standaloneRef.value = asyncResult.data.value;
//   }

//   return { data: standaloneRef, refresh: queryResult.refresh };
// }
