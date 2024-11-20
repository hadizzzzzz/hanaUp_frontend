import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 여행 후 환율 자동 충전 설정을 한 모든 자금을 전역 관리

export const after_exTechCharges = atom({
  key: 'after_exTechCharges',
  default: {
    countryInfo: {},
    // 얼마 이하가 되면
    basisRate: '',
    // 몇번
    duration: '',
    // 얼마
    amount: '',
  },
  effects_UNSTABLE: [persistAtom],
});
