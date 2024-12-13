import fetchRequest from '../../../fetchRequest.js'

const updatePostAction = async ({params, request}) => {
  const formData = await request.formData()
  const body = {}

  if (formData.get('ogTitle') !== formData.get('title')) {
    body.title = formData.get('title')
  }

  if (formData.get('ogContent') !== formData.get('content')) {
    body.title = formData.get('content')
  }

  body.isActive = formData.get('status')

  const originalCategories = formData.get('originalCategories').split(',')
  const updatedCategories = formData.get('updatedCategories').split(',')

  let categoriesToDelete = originalCategories.filter(c => !updatedCategories.includes(c))
  let categoriesToAdd = updatedCategories.filter(c => !originalCategories.includes(c))

  body.categoriesToDelete = categoriesToDelete
  body.categoriesToAdd = categoriesToAdd

  return fetchRequest(
    `/api/post/${params.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    true,
  )
}

export default updatePostAction