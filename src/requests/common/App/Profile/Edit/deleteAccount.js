import fetchRequest from '../../../../fetchRequest.js'

const deleteAccount = async (id) => {
  return fetchRequest(
    `/api/user/${id}`,
    {
      method: 'DELETE',
    },
    true,
  )
}

export default deleteAccount