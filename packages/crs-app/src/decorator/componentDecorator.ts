import { eventBus } from '@/decorator/eventEmitter';

export function MyComponent(value: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    eventBus.on('start-component-add', () => {
      eventBus.emit('add-component', { path: value, comp: target });
    });
  };
}
