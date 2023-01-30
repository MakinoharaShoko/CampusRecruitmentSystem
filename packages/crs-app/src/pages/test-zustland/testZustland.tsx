import { MyComponent } from '@/decorator/componentDecorator';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

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
}
