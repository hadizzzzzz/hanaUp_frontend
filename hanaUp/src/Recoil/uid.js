// 첫 접속 시 uid를 백에서 받아와 저장, 이후 요청시 사용
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// before, during, after
export const uid = atom({
  key: 'uid',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
