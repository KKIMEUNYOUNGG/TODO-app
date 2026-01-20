import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, folders, onToggle, onEdit, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>할일이 없습니다</h3>
        <p>새로운 할일을 추가해보세요!</p>
      </div>
    );
  }

  // 폴더 정보를 찾는 함수
  const getFolder = (folderId) => {
    return folders.find(f => f.id === folderId);
  };

  // 완료 여부로 정렬
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="todo-list">
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          folder={getFolder(todo.folderId)}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
