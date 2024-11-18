import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 여행 전 여행 정보를 받고 난 후, 전역 상태로 관리하여 여행 중 레포트에서 사용한다.

export const during_travelDetail = atom({
  key: 'during_travelDetail',
  default: {
    destination: 'UK',
    startDate: new Date(),
    endDate: new Date(),
    duration: 3, // 총 n일
    type: '', // 소비 유형 테스트시
  },
  effects_UNSTABLE: [persistAtom],
});
