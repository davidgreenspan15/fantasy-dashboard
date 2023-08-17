import { useCallback, useEffect, useState } from 'react'

import axios, { AxiosError } from 'axios'

import { useAxiosResults } from '../types/useAxios'

interface AxiosRequest {
  path: string
  method: string
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
  const getData = useCallback(
    async (path: string, method: string, params?: unknown) => {
      if (!loading) {
        setLoading(true)
      }
      if (error) {
        setError(undefined)
      }
      try {
        const resp = await axios.request({
          url: baseUrl + path,
          method,
          data: params,
        })
        setData(resp.data)
        return { data: resp.data }
      } catch (err) {
        console.error(err)
        setError(err as AxiosError)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [error, loading]
  )
  useEffect(() => {
    if (!path || !method || lazy || loading || skip || data || error) {
      return
    }
    getData(path, method, params).catch(() => void 0)
  }, [data, getData, lazy, loading, method, params, skip, path, error])
  const x = [{ loading, data, error }, getData]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return x as useAxiosResults<any>
}
export default useAxios
