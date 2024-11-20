import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 여행 후 예금 정보를 받고 난 후, 전역 상태로 관리하여 해지하기 클릭시 렌더링
// 해지하기를 눌렀을 때 정보를 받아와야 하기 때문에 사용하는 전역 정보
// 해지 완료시 초기화 요망

export const after_newAccountInfo = atom({
  key: 'after_newAccountInfo',
  default: {
    country: '',
    originalAmount: 0, // 예치한 금액
    interestAmount: 0, // 이자 금액
    finalAmount: 0, // 예치한 돈 + 이자
  },
  effects_UNSTABLE: [persistAtom],
});
