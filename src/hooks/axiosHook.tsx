import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
const useAxios: <T>(
  url: string,
  method: string,
  params?: any,
) => {
  loading: boolean
  data: T
  error: Error | undefined
}[] = (url: string, method: string, params?: any) => {
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
      setData(resp.data)
      return resp
    } catch (err: any) {
      console.error(err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    if (!url || !method || loading) {
      return
    }
    getData(url, method, params)
  }, [method, params, url])

  return [{ loading, data, error }]
}
export default useAxios
