import React, { FC, useState } from 'react'

import { Button, Flex, Input, Spinner } from '@chakra-ui/react'

import FDVStack from '../components/CustomChakraComponents/FDVStack'
import NoHeaderTable from '../components/NoHeaderTable'
import useAxios from '../hooks/axiosHook'
import BackgroundComponent from '../components/BackgroundComponent'
import { backdropFilter } from '../themes/components/Button'

const SQLTool: FC = () => {
  const [response, setResponse] = useState<any[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendQuery(e.target[0].value as string)
  }

  const [{ loading }, call] = useAxios<any[]>({
    path: 'query',
    method: 'post',
    lazy: true,
  })

  const sendQuery = (query: string) => {
    call(`query`, 'post', { query }).then((resp) => {
      setResponse(resp.data)
    })
  }

  const columns = Object.keys(response?.[0] ?? {}).map((key) => ({
    label: key,
    key: key,
    type: typeof response[0][key],
  }))

  return (
    <FDVStack>
      <form onSubmit={handleSubmit}>
        <FDVStack>
          <Input id="query" name="query" />
          <Button
            type="submit"
            isLoading={loading}
            isDisabled={loading}
            loadingText="Searching"
          >
            Submit
          </Button>
        </FDVStack>
      </form>
      <BackgroundComponent title={`${response?.length ?? 0} Rows`}>
        {loading ? (
          <Flex
            minH="50px"
            backgroundColor={'greyBackground'}
            backdropFilter={backdropFilter}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
          >
            <Spinner />
          </Flex>
        ) : (
          <NoHeaderTable
            rows={response}
            showColumnHeaders={true}
            columns={columns}
          />
        )}
      </BackgroundComponent>
      {/* <SQlTable rs={response} /> */}
    </FDVStack>
  )
}

export default SQLTool
