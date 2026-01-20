import React, { useState, useEffect } from 'react';
import { getToday } from '../utils/dateUtils';
import './TodoForm.css';

const TodoForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  folders, 
  editingTodo = null 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    memo: '',
    dueDate: getToday(),
    dueTime: '',
    folderId: ''
  });

  // 수정 모드일 때 데이터 채우기
  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        memo: editingTodo.memo || '',
        dueDate: editingTodo.dueDate || getToday(),
        dueTime: editingTodo.dueTime || '',
        folderId: editingTodo.folderId || ''
      });
    } else {
      // 새로 추가할 때는 초기화
      setFormData({
        title: '',
        memo: '',
        dueDate: getToday(),
        dueTime: '',
        folderId: ''
      });
    }
  }, [editingTodo, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingTodo ? '할일 수정' : '새 할일 추가'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="할일을 입력하세요"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="memo">메모</label>
            <textarea
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleChange}
              placeholder="추가 메모를 입력하세요"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">날짜</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dueTime">시간</label>
              <input
                type="time"
                id="dueTime"
                name="dueTime"
                value={formData.dueTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="folderId">폴더</label>
            <select
              id="folderId"
              name="folderId"
              value={formData.folderId}
              onChange={handleChange}
            >
              <option value="">폴더 선택 안함</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="submit-btn">
              {editingTodo ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
