import { Chess } from '../libs/chess'
import { zeroPad } from '../libs/utils'
import { GameStatus, GameType, StatType, User } from '../types'

const api = new Chess({
  baseURL: 'https://api.chess.com',
  application: 'Twitch Extension <twitter.com/shdlsk>',
})

const getGameStatus = (status: string): GameStatus => {
  switch (status) {
    case 'win':
      return GameStatus.Win
    case 'timevsinsufficient':
    case 'insufficient':
    case 'repetition':
    case 'stalemate':
    case '50move':
    case 'agreed':
      return GameStatus.Draw
    default:
      return GameStatus.Loss
  }
}

const getGameType = (type: string): GameType => {
  switch (type) {
    case 'daily':
      return GameType.Daily
    case 'blitz':
      return GameType.Blitz
    case 'bullet':
      return GameType.Bullet
    default:
      return GameType.Rapid
  }
}

const getUser = async (username: string): Promise<User | undefined> => {
  const user = await api.getPlayer(username)

  if (!user) return

  const stats = await api.getPlayerStats(username)

  const date = new Date()
  const games = await api.getPlayerGames(
    username,
    `${date.getUTCFullYear()}/${zeroPad(date.getUTCMonth() + 1)}`,
    20
  )

  if (!user || !stats || !games) return

  const data: User = {
    username: user.username,
    avatar: user.avatar,
    title: user.title,
    name: user.name,
    url: user.url,

    stats: [
      {
        type: StatType.Rapid,
        title: 'Rapid',
        value: stats.chess_rapid?.last.rating,
      },
      {
        type: StatType.Bullet,
        title: 'Bullet',
        value: stats.chess_bullet?.last.rating,
      },
      {
        type: StatType.Blitz,
        title: 'Blitz',
        value: stats.chess_blitz?.last.rating,
      },
      {
        type: StatType.PuzzlesRush,
        title: 'Puzzle Rush',
        value: stats.puzzle_rush?.best?.score,
      },
    ],
    games: [],
  }

  if (games.length) {
    // /**
    //  * Unique opponents usernames
    //  */
    // const usernames: string[] = []

    // for (const game of games) {
    //   const opponentUsername =
    //     game.black.username.toLowerCase() === username
    //       ? game.white.username.toLowerCase()
    //       : game.black.username.toLowerCase()

    //   if (!usernames.includes(opponentUsername))
    //     usernames.push(opponentUsername)
    // }

    // const opponents = await Promise.all(
    //   usernames.map((username) => api.getPlayer(username))
    // )

    for (const game of games) {
      const [user, opponent] =
        game.black.username.toLowerCase() === username
          ? [game.black, game.white]
          : [game.white, game.black]

      // const avatar = opponents.find(
      //   (user) => user?.username === opponent.username
      // )?.avatar

      data.games.push({
        id: game.uuid,
        url: game.url,
        opponent: {
          username: opponent.username,
          stat: opponent.rating,
          // avatar,
        },
        type: getGameType(game.time_class),
        status: getGameStatus(user.result),
      })
    }
  }

  return data
}

const getResponse = (data: BodyInit, status = 200) => {
  const response = new Response(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    status,
  })

  if (status === 200) {
    response.headers.set('Cache-Control', 'max-age=600')
  }

  return response
}

export async function handleRequest(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    const error = {
      message: 'Missing username query parameter',
    }

    return getResponse(JSON.stringify(error), 400)
  }

  const cache = await CHESSPLAYERS.get(username)

  if (cache) {
    return getResponse(cache)
  }

  const user = await getUser(username)

  if (!user) {
    const error = {
      message: 'User not found',
    }

    return getResponse(JSON.stringify(error), 404)
  }

  if (user?.username === username) {
    await CHESSPLAYERS.put(username, JSON.stringify(user), {
      expirationTtl: 600,
    })
  }

  return getResponse(JSON.stringify(user))
}
