import load from '../../load.js'

const profileInfoLoader = async ({params}) => {
  return load(`/api/user/${params.id}`, { method: 'GET' })
}

export default profileInfoLoader
