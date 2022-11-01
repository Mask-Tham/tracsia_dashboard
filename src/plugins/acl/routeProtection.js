import ability from './ability'
console.log(ability);
export const canNavigate = to => to.matched.some(route => ability.can(route.meta.action || 'read', route.meta.resource))

// for check user can use a function
// meta = {action:'',resource:''}
export const canUse = meta => ability.can(meta.action || 'read', meta.resource)

export const _ = undefined
