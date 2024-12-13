import fetchRequest from '../../../../../fetchRequest.js'

const updateLoginAction = async ({params, request}) => {
  const formData = await request.formData()

  return fetchRequest(
    `/api/user/${params.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        login: formData.get('login')
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true
  )
}

export default updateLoginAction
