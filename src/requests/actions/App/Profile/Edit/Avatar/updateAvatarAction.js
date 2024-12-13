import fetchRequest from '../../../../../fetchRequest.js'

const updateAvatarAction = async ({params, request}) => {
  const formData = await request.formData()

  if (formData.get('type') === 'update') {
    return fetchRequest(
      '/api/user/avatar',
      {
        method: 'PATCH',
        body: formData,
      },
      true
    )
  } else if (formData.get('type') === 'reset') {
    return fetchRequest(
      `/api/user/${params.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          resetProfilePicture: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      true
    )
  }

  return new Response('Invalid action', {status: 400})
}

export default updateAvatarAction
