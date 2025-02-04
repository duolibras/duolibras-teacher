import { create } from 'zustand';

type EntityMap = Record<string, string>;

interface IStore {
  idMap: EntityMap;

  setId(key: string, value: string): void;
}

export const useStore = create<IStore>((set) => ({
  idMap: {},
  setId: (key: string, value: string) => set((state) => ({ idMap: {...state.idMap, [key]: value} })),
}))