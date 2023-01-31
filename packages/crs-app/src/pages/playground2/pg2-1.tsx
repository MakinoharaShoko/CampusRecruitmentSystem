import { MyComponent } from '@/decorator/componentDecorator';
import { useRef } from 'react';

export class Pg21 {
  @MyComponent('test-textInput')
  public testTextInput() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    function handleClick() {
      inputRef.current?.focus();
    }

    return (
      <div>
        <button onClick={handleClick}>ClickMe</button>
        <input ref={inputRef} />
      </div>
    );
  }
}
