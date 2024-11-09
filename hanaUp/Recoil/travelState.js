import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const travelInfo = atom({
  key: 'travelInfo',
  default: 'before',
  effects_UNSTABLE: [persistAtom],
});
