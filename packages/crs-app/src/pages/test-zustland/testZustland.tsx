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
      return state;
    }),
  removeAllBears: () => set({ bears: 0 }),
}));

function useStoreOutsideOfFunc() {
  useBearStore2.setState({ bears: 0 });
}

function BearCounter() {
  const bears = useBearStore2((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore2((state) => state.increasePopulation);
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
    const text = `胸につかえていることを、时は解决してくれない。忘却のラベルを贴るだけで。
心中怀抱的东西，并不能随时间流去而淡解。只是贴上忘却的标签来掩饰。
The things that are stuck in your chest, time won't solve them. It just pastes the label of oblivion.`;
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
