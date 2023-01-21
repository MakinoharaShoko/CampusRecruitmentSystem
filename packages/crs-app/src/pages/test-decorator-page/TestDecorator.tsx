import { MyComponent } from '@/decorator/componentDecorator';

export class TestComp {
  @MyComponent('test-decorator')
  public render() {
    return <div>Test</div>;
  }
}
