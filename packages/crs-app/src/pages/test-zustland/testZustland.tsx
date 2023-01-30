import { MyComponent } from '@/decorator/componentDecorator';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import styles from './yy.module.scss';
import { configureStore } from '@/utils/configureStore';

const useBearStore = create(
  immer(
    combine({ bears: 0 }, (set) => ({
      increasePopulation: () =>
        set((state) => {
          state.bears++;
        }),
      removeAllBears: () => set({ bears: 0 }),
    })),
  ),
);

const useBearStore2 = configureStore({ bears: 0 }, (set) => ({
  increasePopulation: () =>
    set((state) => {
      state.bears++;
    }),
  removeAllBears: () => set({ bears: 0 }),
}));

function useStoreOutsideOfFunc() {
  useBearStore.setState({ bears: 0 });
}

function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}

export class TestZustand {
  @MyComponent('test-zustland')
  public testZustand() {
    return (
      <div>
        Test Zustland
        <button onClick={useStoreOutsideOfFunc}>clear</button>
        <BearCounter />
        <Controls />
      </div>
    );
  }

  @MyComponent('test-text')
  public testText() {
    const text = '為什麼你會這麼熟練啊！你和雪菜親過多少次了啊!?你到底要把我甩開多遠你才甘心啊!?';
    const arr = text.split('');
    const textV = arr.map((char, i) => {
      return (
        <span key={char + i} className={styles.container}>
          <span className={styles.zhanwei}>
            {char}
            <span className={styles.outer}>{char}</span>
            <span className={styles.inner}>{char}</span>
          </span>
        </span>
      );
    });
    return <div>{textV}</div>;
  }
}
