import React, { FC, useState } from 'react'

import axios from 'axios'

import { Button, Input } from '@chakra-ui/react'

import FDVStack from '../components/CustomChakraComponents/FDVStack'
import SQlTable from '../components/SQlTable'

const SQLTool: FC = () => {
  const [response, setResponse] = useState()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendQuery(e.target[0].value as string)
  }
  const sendQuery = (query: string) => {
    axios
      .post(
        `http://localhost:8000/query`,
        { query },
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((resp) => {
        console.debug(resp)
        setResponse(resp.data)
      })
  }

  return (
    <FDVStack>
      <form onSubmit={handleSubmit}>
        <FDVStack>
          <Input id="query" name="query" />
          <Button type="submit">Submit</Button>
        </FDVStack>
      </form>
      <SQlTable rs={response} />
    </FDVStack>
  )
}

export default SQLTool
