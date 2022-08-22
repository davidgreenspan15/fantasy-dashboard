import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
export type CallFn<T> = (
  url: string,
  method: string,
  params?: any,
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

const useAxios: <T>(url: string, method: string, lazy: boolean, params?: any) => useAxiosResults<T> = (
  url: string,
  method: string,
  lazy: boolean,
  params?: any,
) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()
  const [error, setError] = useState<Error>()

  const getData = useCallback(async (url: string, method: string, params?: any) => {
    if (!loading) {
      setLoading(true)
    }
    if (error) {
      setError(undefined)
    }
    try {
      const resp = await axios.request({ url, method, data: params })
      setData(resp.data as any)
      return { data: resp.data }
    } catch (err: any) {
      console.error(err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    if (!url || !method || lazy || loading) {
      return
    }
    getData(url, method, params).catch((err) => void 0)
  }, [method, url])
  const x = [{ loading, data, error }, getData]
  return x as useAxiosResults<any>
}
export default useAxios
