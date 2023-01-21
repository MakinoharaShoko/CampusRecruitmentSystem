import { compsToRegister } from '@/pages/compsToRegister';
import { createElement, useEffect } from 'react';
import { useValue } from '@/hooks/useValue';

export function useRigisterComps(AppRoutes: ReturnType<typeof useValue<Array<any>>>) {
  useEffect(() => {
    for (const Comp of compsToRegister) {
      const routes = Reflect.getMetadata('routes', Comp);
      for (const route of routes) {
        AppRoutes.set([...AppRoutes.value, { path: route.path, element: createElement(route.render) }]);
      }
    }
  }, []);
}
