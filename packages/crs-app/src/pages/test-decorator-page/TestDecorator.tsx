import { MyComponent } from '@/decorator/componentDecorator';

export class TestComp {
  @MyComponent('test-decorator')
  public TestComp1() {
    return <div>Test</div>;
  }

  @MyComponent('test2')
  public TestComp2() {
    return <div>Test2</div>;
  }
}
