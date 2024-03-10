export type useAxiosResults<T> = [CallResult<T>, CallFn<T>]

export type CallResult<T> = {
  // response data
  data?: T
  // response error
  error?: Error | undefined
  // whether the request is loading
  loading: boolean
}

export type CallFn<T> = (
  url: string,
  method: string,
  data?: unknown,
  params?: unknown
) => Promise<{
  data: T
}>
