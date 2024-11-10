function calculateDateDiff(date1, date2) {
  // 두 날짜를 UTC 기준으로 설정 (시간 차이 무시)
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  // 두 날짜의 차이 (밀리초)
  const diffInMs = Math.abs(utc2 - utc1);

  // 밀리초를 일 단위로 변환
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}

export default calculateDateDiff;
