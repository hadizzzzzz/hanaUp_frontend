import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const fundInfoState = atom({
  key: 'fundInfoState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// {
//     "country": "Japan",
//     "currency": "JPY",
//     "balance": 12000,
//     "exchangeRate": {
//       "rate": 901.28,
//       "previousRate": 890.00,  // 예시로 이전 환율 값 추가
//       "trend": "up"  // "up" 또는 "down"으로 환율 변화 방향 표시
//     }
//   },
//   {
//     "country": "USA",
//     "currency": "USD",
//     "balance": 500,
//     "exchangeRate": {
//       "rate": 1391.5,
//       "previousRate": 1400.00,  // 예시로 이전 환율 값 추가
//       "trend": "down"  // "up" 또는 "down"으로 환율 변화 방향 표시
//     }
//   }
