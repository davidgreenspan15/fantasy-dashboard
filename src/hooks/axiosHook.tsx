import { useCallback, useEffect, useState } from 'react'

import axios, { AxiosError, Method } from 'axios'

import { useAxiosResults } from '../types/useAxios'

interface AxiosRequest {
  path: string
  method: Method
  lazy?: boolean
  skip?: boolean
  params?: unknown
}

const useAxios: <T>(req: AxiosRequest) => useAxiosResults<T> = ({
  path,
  method,
  lazy,
  skip,
  params,
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<unknown>(undefined)
  const [error, setError] = useState<AxiosError>()
  const baseUrl = 'http://localhost:8000/'
  const call = useCallback(
    async (url: string, method: Method, data: any, params?: any) => {
      setLoading(true)
      try {
        const payload = method === 'get' ? { params } : { data }
        const response = await axios(baseUrl + url, { method, ...payload })
        setData(response.data)
        return response
      } catch (err) {
        setError(err as AxiosError)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )
  useEffect(() => {
    if (!path || !method || lazy || loading || skip || data || error) {
      return
    }
    call(path, method, params, params).catch(() => void 0)
  }, [data, call, lazy, loading, method, params, skip, path, error])
  const x = [{ loading, data, error }, call]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return x as useAxiosResults<any>
}
export default useAxios
