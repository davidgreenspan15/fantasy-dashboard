import React from 'react'

import { Navigate, createBrowserRouter } from 'react-router-dom'

import BasicDraftBoard from './components/fantasysports/BasicDraftBoard'
import HomePage from './pages/Home'
import PlayersPage from './pages/Players'
// import RosterList from './pages/RosterList'
import SQLTool from './pages/SQlTool'
import TeamsPage from './pages/Teams'
import ErrorPage from './errorPage'
import ProtectedPage from './pages/ProtectedPage'
import GamesPage from './pages/Games'
import GameSummaryPage from './pages/GameSummary'
import RosterPage from './pages/Roster'

const router = createBrowserRouter([
  {
    path: '/home',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedPage>
        <HomePage />
      </ProtectedPage>
    ),
  },
  {
    path: '/teams',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedPage>
        <TeamsPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/players',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedPage>
        <PlayersPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/games',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedPage>
        <GamesPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/gameSummary',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedPage>
        <GameSummaryPage />
      </ProtectedPage>
    ),
  },
  {
    path: '/roster',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedPage>
        <RosterPage />
      </ProtectedPage>
    ),
  },

  {
    path: '/sql-tool',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedPage>
        <SQLTool />
      </ProtectedPage>
    ),
  },
  // {
  //   path: 'rosters',
  //   children: [
  //     {
  //       index: true,
  //       element: <RosterList />,
  //     },
  //     {
  //       path: ':id',
  //       element: <Roster />,
  //     },
  //   ],
  // },
  {
    path: 'fantasy-draft-board',
    element: (
      <ProtectedPage>
        <BasicDraftBoard />
      </ProtectedPage>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/home" />,
    errorElement: <ErrorPage />,
  },
])

export default router
