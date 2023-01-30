import 'reflect-metadata';

export function MyComponent(value: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }
    const routes = Reflect.getMetadata('routes', target.constructor) as Array<any>;
    routes.push({
      path: value,
      render: target[propertyKey],
      propertyKey,
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
}
