// 날짜 관련 유틸리티 함수

// 날짜를 YYYY-MM-DD 형식으로 변환
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 오늘 날짜 가져오기
export const getToday = () => {
  return formatDate(new Date());
};

// 이번 주의 시작일과 종료일 가져오기 (월요일 ~ 일요일)
export const getThisWeek = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day; // 일요일이면 -6, 아니면 월요일까지의 차이
  
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return {
    start: formatDate(monday),
    end: formatDate(sunday)
  };
};

// 날짜가 오늘인지 확인
export const isToday = (dateString) => {
  if (!dateString) return false;
  return dateString === getToday();
};

// 날짜가 이번 주인지 확인
export const isThisWeek = (dateString) => {
  if (!dateString) return false;
  const week = getThisWeek();
  return dateString >= week.start && dateString <= week.end;
};

// 날짜가 미래인지 확인 (이번 주 이후)
export const isLater = (dateString) => {
  if (!dateString) return true; // 날짜가 없으면 "나중에"로 분류
  const week = getThisWeek();
  return dateString > week.end;
};

// 날짜를 한글로 표시 (예: 2026년 1월 20일)
export const formatDateKorean = (dateString) => {
  if (!dateString) return '날짜 없음';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

// 요일 가져오기
export const getDayOfWeek = (dateString) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateString);
  return days[date.getDay()];
};

// 상대적 날짜 표시 (오늘, 내일, 어제 등)
export const getRelativeDate = (dateString) => {
  if (!dateString) return '날짜 없음';
  
  const today = getToday();
  const tomorrow = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));
  const yesterday = formatDate(new Date(new Date().setDate(new Date().getDate() - 1)));
  
  if (dateString === today) return '오늘';
  if (dateString === tomorrow) return '내일';
  if (dateString === yesterday) return '어제';
  
  return `${formatDateKorean(dateString)} (${getDayOfWeek(dateString)})`;
};
