import React, { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import HomePage from './pages/Home'
import TeamsPage from './pages/Teams'
import PlayersPage from './pages/Players'
import SQLTool from './pages/SQlTool'
import Roster from './pages/Roster'
import RosterList from './pages/RosterList'
import BasicDraftBoard from './components/fantasysports/BasicDraftBoard'

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
