import { useState, useEffect } from 'react';
import { getTodos, saveTodos, getFolders, saveFolders } from '../utils/localStorage';
import { isToday, isThisWeek, isLater } from '../utils/dateUtils';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('today');
  const [selectedFolder, setSelectedFolder] = useState(null);

  // 초기 데이터 로드
  useEffect(() => {
    setTodos(getTodos());
    setFolders(getFolders());
  }, []);

  // todos가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (todos.length > 0 || getTodos().length > 0) {
      saveTodos(todos);
    }
  }, [todos]);

  // folders가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (folders.length > 0) {
      saveFolders(folders);
    }
  }, [folders]);

  // 할일 추가
  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      title: todoData.title,
      memo: todoData.memo || '',
      dueDate: todoData.dueDate || '',
      dueTime: todoData.dueTime || '',
      folderId: todoData.folderId || null,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  // 할일 수정
  const updateTodo = (id, updatedData) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedData } : todo
    ));
  };

  // 할일 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 할일 완료 토글
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 폴더 추가
  const addFolder = (folderData) => {
    const newFolder = {
      id: Date.now().toString(),
      name: folderData.name,
      color: folderData.color
    };
    setFolders([...folders, newFolder]);
  };

  // 폴더 수정
  const updateFolder = (id, updatedData) => {
    setFolders(folders.map(folder => 
      folder.id === id ? { ...folder, ...updatedData } : folder
    ));
  };

  // 폴더 삭제
  const deleteFolder = (id) => {
    // 폴더를 삭제할 때 해당 폴더의 할일들의 folderId를 null로 설정
    setTodos(todos.map(todo => 
      todo.folderId === id ? { ...todo, folderId: null } : todo
    ));
    setFolders(folders.filter(folder => folder.id !== id));
  };

  // 카테고리별 필터링
  const getFilteredTodos = () => {
    let filtered = todos;

    // 카테고리 필터링
    if (selectedCategory === 'today') {
      filtered = filtered.filter(todo => isToday(todo.dueDate));
    } else if (selectedCategory === 'week') {
      filtered = filtered.filter(todo => isThisWeek(todo.dueDate));
    } else if (selectedCategory === 'later') {
      filtered = filtered.filter(todo => isLater(todo.dueDate));
    }

    // 폴더 필터링
    if (selectedFolder) {
      filtered = filtered.filter(todo => todo.folderId === selectedFolder);
    }

    return filtered;
  };

  // 오늘 할일 가져오기
  const getTodayTodos = () => {
    return todos.filter(todo => isToday(todo.dueDate));
  };

  // 완료되지 않은 오늘 할일 개수
  const getTodayPendingCount = () => {
    return todos.filter(todo => isToday(todo.dueDate) && !todo.completed).length;
  };

  // 폴더별 할일 개수
  const getTodoCountByFolder = (folderId) => {
    return todos.filter(todo => todo.folderId === folderId && !todo.completed).length;
  };

  return {
    todos,
    folders,
    selectedCategory,
    selectedFolder,
    setSelectedCategory,
    setSelectedFolder,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    addFolder,
    updateFolder,
    deleteFolder,
    getFilteredTodos,
    getTodayTodos,
    getTodayPendingCount,
    getTodoCountByFolder
  };
};
