import fetchRequest from '../../../../fetchRequest.js'

const setColorSchema = async (id, color) => {
  return fetchRequest(
    `/api/user/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        colorSchema: color
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  )
}

export default setColorSchema
