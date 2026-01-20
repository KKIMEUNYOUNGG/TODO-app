import React from 'react';
import { getRelativeDate } from '../utils/dateUtils';
import './TodoItem.css';

const TodoItem = ({ todo, folder, onToggle, onEdit, onDelete }) => {
  const formatTime = (time) => {
    if (!time) return '';
    return time.slice(0, 5); // HH:MM 형식으로 변환
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div 
        className="todo-color-bar" 
        style={{ backgroundColor: folder?.color || '#e8e8e8' }}
      />
      
      <div className="todo-checkbox-wrapper">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
      </div>

      <div className="todo-content">
        <h4 className="todo-title">{todo.title}</h4>
        {todo.memo && (
          <p className="todo-memo">{todo.memo}</p>
        )}
        <div className="todo-meta">
          {todo.dueDate && (
            <span className="todo-date">
              📅 {getRelativeDate(todo.dueDate)}
              {todo.dueTime && ` ${formatTime(todo.dueTime)}`}
            </span>
          )}
          {folder && (
            <span 
              className="todo-folder"
              style={{ backgroundColor: folder.color }}
            >
              {folder.name}
            </span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button 
          className="todo-action-btn edit"
          onClick={() => onEdit(todo)}
          title="수정"
        >
          ✏️
        </button>
        <button 
          className="todo-action-btn delete"
          onClick={() => onDelete(todo.id)}
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
