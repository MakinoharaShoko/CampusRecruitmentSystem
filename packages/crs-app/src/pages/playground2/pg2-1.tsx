import { MyComponent } from '@/decorator/componentDecorator';
import React, { useRef, useState } from 'react';

const SwipeableOptions = ({ children, options, onOptionSelect }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [slideAmount, setSlideAmount] = useState(0);
  const startX = useRef(null);

  const handleTouchStart = (event) => {
    startX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX.current;
    setSlideAmount(deltaX);
  };

  const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX.current;

    if (deltaX > 50) {
      setShowOptions(false);
    } else if (deltaX < -50) {
      setShowOptions(true);
    }
    setSlideAmount(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        display: 'flex',
        transform: `translateX(${slideAmount}px)`,
        width: '500px',
        height: '56px',
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            padding: '10px',
            display: showOptions ? 'flex' : 'none',
            width: '100%',
            height: '100%',
          }}
          onClick={() => onOptionSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SwipeableOptions;

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

  @MyComponent('test-swipe')
  public testSwipe() {
    const options = ['Option 1', 'Option 2', 'Option 3'];

    const onOptionSelect = (option) => {
      console.log(`Selected option: ${option}`);
    };

    return (
      <SwipeableOptions options={options} onOptionSelect={onOptionSelect}>
        123
      </SwipeableOptions>
    );
  }
}
