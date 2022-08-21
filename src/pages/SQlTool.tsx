import { Button, Input } from '@chakra-ui/react'
import React, { DetailedHTMLProps, FC, FormHTMLAttributes, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import FDVStack from '../components/CustomChakraComponents/FDVStack'
import SQlTable from '..//components/SQlTable'

const SQLTool: FC = () => {
  const [response, setResponse] = useState()

  const handleSubmit = (e: any) => {
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
        },
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
          <Input id="query" name="query" onChange={(e) => {}} />
          <Button type="submit">Submit</Button>
        </FDVStack>
      </form>
      <SQlTable rs={response} />
    </FDVStack>
  )
}

export default SQLTool
