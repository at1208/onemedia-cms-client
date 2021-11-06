import { isAuth } from '../actions/auth';

export const checkVisiblityOnSidebar = (moduleType) => {
 let module_visibility = isAuth() && isAuth().module_visibility;
  return module_visibility[moduleType];
}
