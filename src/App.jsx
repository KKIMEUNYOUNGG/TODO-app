import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import Dashboard from './components/Dashboard';
import CategoryTabs from './components/CategoryTabs';
import FolderManager from './components/FolderManager';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  const {
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
    deleteFolder,
    getFilteredTodos,
    getTodayTodos,
    getTodayPendingCount,
    getTodoCountByFolder
  } = useTodos();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, formData);
    } else {
      addTodo(formData);
    }
  };

  const handleDeleteTodo = (id) => {
    if (window.confirm('이 할일을 삭제하시겠습니까?')) {
      deleteTodo(id);
    }
  };

  const filteredTodos = getFilteredTodos();
  const todayTodos = getTodayTodos();

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">✨ 할일 관리</h1>
          <button className="add-todo-btn" onClick={handleAddTodo}>
            <span className="btn-icon">+</span>
            <span className="btn-text">새 할일</span>
          </button>
        </header>

        <Dashboard 
          todayTodos={todayTodos}
          pendingCount={getTodayPendingCount()}
        />

        <div className="app-layout">
          <aside className="sidebar">
            <FolderManager
              folders={folders}
              selectedFolder={selectedFolder}
              onFolderSelect={setSelectedFolder}
              onAddFolder={addFolder}
              onDeleteFolder={deleteFolder}
              getTodoCount={getTodoCountByFolder}
            />
          </aside>

          <main className="main-content">
            <CategoryTabs
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            <TodoList
              todos={filteredTodos}
              folders={folders}
              onToggle={toggleTodo}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          </main>
        </div>

        <TodoForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTodo(null);
          }}
          onSubmit={handleFormSubmit}
          folders={folders}
          editingTodo={editingTodo}
        />
      </div>

      <footer className="app-footer">
        <p>© 2026 할일 관리 | 모든 데이터는 로컬에 안전하게 저장됩니다</p>
      </footer>
    </div>
  );
}

export default App;
