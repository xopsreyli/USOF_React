import load from '../../load.js'

const leaderboardLoader = async () => {
  return load('/api/user/top', { method: 'GET' })
}

export default leaderboardLoader
