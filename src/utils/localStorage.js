// 로컬 스토리지 관리 유틸리티

const TODOS_KEY = 'todos';
const FOLDERS_KEY = 'folders';

// 할일 목록 가져오기
export const getTodos = () => {
  try {
    const todos = localStorage.getItem(TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('할일 목록을 불러오는데 실패했습니다:', error);
    return [];
  }
};

// 할일 목록 저장하기
export const saveTodos = (todos) => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('할일 목록을 저장하는데 실패했습니다:', error);
  }
};

// 폴더 목록 가져오기
export const getFolders = () => {
  try {
    const folders = localStorage.getItem(FOLDERS_KEY);
    if (folders) {
      return JSON.parse(folders);
    }
    // 기본 폴더 반환
    const defaultFolders = [
      { id: 'work', name: '업무', color: '#FFB5BA' },
      { id: 'personal', name: '개인', color: '#B5D9FF' },
      { id: 'study', name: '공부', color: '#D4F1C5' }
    ];
    saveFolders(defaultFolders);
    return defaultFolders;
  } catch (error) {
    console.error('폴더 목록을 불러오는데 실패했습니다:', error);
    return [];
  }
};

// 폴더 목록 저장하기
export const saveFolders = (folders) => {
  try {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  } catch (error) {
    console.error('폴더 목록을 저장하는데 실패했습니다:', error);
  }
};
