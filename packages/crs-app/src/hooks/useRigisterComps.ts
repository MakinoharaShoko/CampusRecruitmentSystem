import { createElement } from 'react';

export function useRigisterComps(compsToRegister: Array<any>) {
  const returnRoutes = [];
  for (const Comp of compsToRegister) {
    const routes = Reflect.getMetadata('routes', Comp);
    for (const route of routes) {
      returnRoutes.push({ path: route.path, element: createElement(route.render) });
    }
  }
  return returnRoutes;
}
