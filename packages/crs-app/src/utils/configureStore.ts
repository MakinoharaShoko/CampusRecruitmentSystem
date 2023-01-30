import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { combine } from 'zustand/middleware';

type Write<T, U> = Omit<T, keyof U> & U;
type Combine = <
  T extends object,
  U extends object,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  initialState: T,
  additionalStateCreator: StateCreator<T, Mps, Mcs, U>,
) => StateCreator<Write<T, U>, Mps, Mcs>;

export function configureStore<
  T extends object,
  U extends object,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(initialState: T, additionalStateCreator: StateCreator<T, Mps, Mcs, U>) {
  // @ts-ignore
  return create(immer(combine(initialState as T, additionalStateCreator as StateCreator<T, Mps, Mcs, U>)));
}
