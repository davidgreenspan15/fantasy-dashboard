import { useCallback, useEffect, useState } from 'react'

import axios from 'axios'

export type CallFn<T> = (
  url: string,
  method: string,
  params?: unknown
) => Promise<{
  data: T
}>

export type CallResult<T> = {
  // response data
  data?: T
  // response error
  error?: Error | undefined
  // whether the request is loading
  loading: boolean
}

export type useAxiosResults<T> = [CallResult<T>, CallFn<T>]

const useAxios: <T>(
  url: string,
  method: string,
  lazy: boolean,
  skip?: boolean,
  params?: unknown
) => useAxiosResults<T> = (
  url: string,
  method: string,
  lazy: boolean,
  skip?: boolean,
  params?: unknown
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<unknown>(undefined)
  const [error, setError] = useState<Error>()

  const getData = useCallback(
    async (url: string, method: string, params?: unknown) => {
      if (!loading) {
        setLoading(true)
      }
      if (error) {
        setError(undefined)
      }
      try {
        const resp = await axios.request({ url, method, data: params })
        setData(resp.data)
        return { data: resp.data }
      } catch (err) {
        console.error(err)
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [error, loading]
  )
  useEffect(() => {
    if (!url || !method || lazy || loading || skip || data || error) {
      return
    }
    getData(url, method, params).catch(() => void 0)
  }, [data, getData, lazy, loading, method, params, skip, url, error])
  const x = [{ loading, data, error }, getData]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return x as useAxiosResults<any>
}
export default useAxios
