const permissions = {
  admin: [
    'update:user',
    'view:userOwnProfile',
    'view:settings',
    'view:favorites',
    'view:postStatus',
    'view:edit',
    'create:post',
    'update:post',
    'view:addToFavorites',
    'view:postManageBtn',
    'view:commentForm',
    'delete:ownComment',
  ],
  user: [
    'update:user',
    'view:userOwnProfile',
    'view:settings',
    'view:favorites',
    'view:postStatus',
    'view:edit',
    'create:post',
    'update:post',
    'view:addToFavorites',
    'view:postManageBtn',
    'view:commentForm',
    'delete:ownComment',
  ]
}

const hasPermission = (user, permission, targetId = null) => {
  if (!user) {
    return false
  }

  if (user?.role === 'admin') {
    return !!permissions[user?.role]?.includes(permission)
  }

  return !!(permissions[user?.role]?.includes(permission)) &&
    (targetId ? user.id === targetId : true)
}

export default hasPermission