import fetchRequest from '../../../../fetchRequest.js'

const setThemeMode = async (id, theme) => {
  return fetchRequest(
    `/api/user/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        theme: theme
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  )
}

export default setThemeMode
