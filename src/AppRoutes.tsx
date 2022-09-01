import React, { FC } from 'react'

import { useRoutes } from 'react-router-dom'

import BasicDraftBoard from './components/fantasysports/BasicDraftBoard'
import HomePage from './pages/Home'
import PlayersPage from './pages/Players'
import Roster from './pages/Roster'
import RosterList from './pages/RosterList'
import SQLTool from './pages/SQlTool'
import TeamsPage from './pages/Teams'

const AppRoutes: FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomePage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'home',
          element: <HomePage />,
        },
      ],
    },
    {
      path: 'teams',
      element: <TeamsPage />,
    },
    {
      path: 'players',
      element: <PlayersPage />,
    },
    {
      path: 'sql-tool',
      element: <SQLTool />,
    },
    {
      path: 'rosters',
      children: [
        {
          index: true,
          element: <RosterList />,
        },
        {
          path: ':id',
          element: <Roster />,
        },
      ],
    },
    {
      path: 'fantasy-draft-board',
      element: <BasicDraftBoard />,
    },
  ])

  return routes
}

export default AppRoutes
