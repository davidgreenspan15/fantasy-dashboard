import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import BasicDraftBoard from './components/fantasysports/BasicDraftBoard'
import HomePage from './pages/Home'
import PlayersPage from './pages/Players'
// import RosterList from './pages/RosterList'
import SQLTool from './pages/SQlTool'
import TeamsPage from './pages/Teams'
import ErrorPage from './errorPage'
import ProtectedPage from './pages/ProtectedPage'
import GamesPage from './pages/Schedule'
import GameSummaryPage from './pages/GameSummary'
import RosterPage from './pages/Roster'
import LeaguePage from './pages/Leagues'
import TeamsList from './components/TeamsList'
import TeamPage from './pages/Team'
import ScoreboardPage from './pages/ScoreboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedPage />,
    children: [
      {
        path: 'home',
        errorElement: <ErrorPage />,
        element: <HomePage />,
      },
      {
        path: ':league',
        element: <LeaguePage />,
        children: [
          {
            path: 'teams',
            errorElement: <ErrorPage />,
            element: <TeamsPage />,
            children: [
              {
                index: true,
                errorElement: <ErrorPage />,
                element: <TeamsList />,
              },
              {
                path: ':team',
                errorElement: <ErrorPage />,
                element: <TeamPage />,
                children: [
                  {
                    path: 'roster',
                    errorElement: <ErrorPage />,
                    element: <RosterPage />,
                  },
                  {
                    path: 'schedule',
                    errorElement: <ErrorPage />,
                    element: <GamesPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'scoreboard',
            errorElement: <ErrorPage />,
            element: <ScoreboardPage />,
            children: [
              {
                path: ':gameId',
                errorElement: <ErrorPage />,
                element: <GameSummaryPage />,
              },
            ],
          },
        ],
      },

      {
        path: 'players',
        errorElement: <ErrorPage />,
        element: <PlayersPage />,
      },
      {
        path: 'games',
        errorElement: <ErrorPage />,
        element: <GamesPage />,
      },

      {
        path: 'sql-tool',
        errorElement: <ErrorPage />,
        element: <SQLTool />,
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
        element: <BasicDraftBoard />,
      },
    ],
  },

  // {
  //   path: '*',
  //   element: <Navigate to="/home" />,
  //   errorElement: <ErrorPage />,
  // },
])

export default router
