export interface PromiseParams<T> {
  params: Promise<T>;
}

export interface PromiseSearchParams<T> {
  searchParams: Promise<T>;
}

export interface PromiseParamsWithSearch<T, K> {
  params: Promise<T>;
  searchParams: Promise<K>;
}
