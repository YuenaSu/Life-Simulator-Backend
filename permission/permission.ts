import { Request } from 'express';
const permissions = {
  canManageUsers: 'canManageUsers',
  canRemoveAds: 'canRemoveAds',
};

const roles = {
  admin: 'admin',
  platinum: 'platinum',
  free: 'free',
};

export const contentLevels = {
  admin: [roles.admin],
  platinum: [roles.platinum, roles.admin],
  free: [roles.free, roles.platinum, roles.admin],
};

const rolePermissions = {
  [roles.admin]: [permissions.canManageUsers, permissions.canRemoveAds],
  [roles.platinum]: [permissions.canRemoveAds],
  [roles.free]: [],
};

export const roleCheck = (req: Request, roles: string[]) => {
  if (req.session?.user && roles.includes(req.session.user.role)) {
    return true;
  } else {
    return false;
  }
};

export default { rolePermissions, permissions, roles, contentLevels, roleCheck };
