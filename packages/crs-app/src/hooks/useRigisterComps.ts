import { compsToRegister } from '@/pages/compsToRegister';
import React, { useEffect } from 'react';
import { useValue } from '@/hooks/useValue';
import { eventBus } from '@/decorator/eventEmitter';

export function useRigisterComps(AppRoutes: ReturnType<typeof useValue<Array<any>>>) {
  useEffect(() => {
    eventBus.on('add-component', (value: any) => {
      const element = React.createElement(value.comp.render);
      AppRoutes.set([...AppRoutes.value, { path: value.path, element }]);
    });
    const appComps = new AppComps(compsToRegister);
    eventBus.emit('start-component-add');
  }, []);
}

class AppComps {
  public constructor(appPages: Array<any>) {
    for (const Comp of appPages) {
      const c = new Comp();
    }
  }
}
