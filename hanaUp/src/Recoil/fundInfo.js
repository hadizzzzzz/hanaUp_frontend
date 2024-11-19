import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// localStorage.clear(); // 로컬 스토리지의 모든 데이터 삭제
export const fundInfoState = atom({
  key: 'fundInfoState',
  default: {
    foreignSavings: {
      totalAmount: 9000,
      country: 'USA',
      currency: 'USD',
      //"lastDate": "2024-12-04" 발표 날로 고정!,
      exchangeRate: {
        rate: 1391.5,
      },
    },
    countryFunds: [
      {
        country: 'Japan',
        currency: 'JPY',
        balance: 12000,
        exchangeRate: {
          rate: 901.28,
          trend: 'up',
        },
      },
      {
        country: 'China',
        currency: 'CNH',
        balance: 500,
        exchangeRate: {
          rate: 194.34,
          trend: 'down',
        },
      },
      {
        country: 'Europe',
        currency: 'EUR',
        balance: 1470,
        exchangeRate: {
          rate: 901.28,
          trend: 'up',
        },
      },
    ],
  },
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
