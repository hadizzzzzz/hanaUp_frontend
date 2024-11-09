import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// before, during, after
export const travelInfo = atom({
  key: 'travelInfo',
  default: 'after',
  effects_UNSTABLE: [persistAtom],
});
