import fetchRequest from '../../../../../fetchRequest.js'

const updateFullNameAction = async ({params, request}) => {
  const formData = await request.formData()

  return fetchRequest(
    `/api/user/${params.id}`,
    {
        method: 'PATCH',
        body: JSON.stringify({
          fullName: formData.get('fullName')
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    true
    )
}

export default updateFullNameAction
