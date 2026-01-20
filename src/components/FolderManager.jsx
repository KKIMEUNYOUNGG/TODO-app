import React, { useState } from 'react';
import './FolderManager.css';

const FolderManager = ({ 
  folders, 
  selectedFolder, 
  onFolderSelect, 
  onAddFolder, 
  onDeleteFolder,
  getTodoCount 
}) => {
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#FFB5BA');

  const presetColors = [
    '#FFB5BA', // 파스텔 핑크
    '#B5D9FF', // 파스텔 블루
    '#D4F1C5', // 파스텔 그린
    '#FFE5B5', // 파스텔 옐로우
    '#E5B5FF', // 파스텔 퍼플
    '#FFD4B5', // 파스텔 오렌지
    '#B5FFF0', // 파스텔 민트
    '#FFB5E5'  // 파스텔 로즈
  ];

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder({ name: newFolderName, color: newFolderColor });
      setNewFolderName('');
      setNewFolderColor('#FFB5BA');
      setIsAddingFolder(false);
    }
  };

  return (
    <div className="folder-manager">
      <div className="folder-header">
        <h3>📁 폴더</h3>
        <button 
          className="add-folder-btn"
          onClick={() => setIsAddingFolder(!isAddingFolder)}
          title="폴더 추가"
        >
          {isAddingFolder ? '✕' : '+'}
        </button>
      </div>

      {isAddingFolder && (
        <div className="add-folder-form">
          <input
            type="text"
            placeholder="폴더 이름"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
            autoFocus
          />
          <div className="color-picker">
            {presetColors.map(color => (
              <button
                key={color}
                className={`color-option ${newFolderColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setNewFolderColor(color)}
              />
            ))}
          </div>
          <button className="save-folder-btn" onClick={handleAddFolder}>
            추가
          </button>
        </div>
      )}

      <div className="folder-list">
        <button
          className={`folder-item ${selectedFolder === null ? 'active' : ''}`}
          onClick={() => onFolderSelect(null)}
        >
          <span className="folder-icon">📋</span>
          <span className="folder-name">전체</span>
        </button>

        {folders.map(folder => (
          <div key={folder.id} className="folder-item-wrapper">
            <button
              className={`folder-item ${selectedFolder === folder.id ? 'active' : ''}`}
              onClick={() => onFolderSelect(folder.id)}
              style={{ borderLeftColor: folder.color }}
            >
              <span className="folder-color" style={{ backgroundColor: folder.color }} />
              <span className="folder-name">{folder.name}</span>
              <span className="folder-count">{getTodoCount(folder.id)}</span>
            </button>
            <button
              className="delete-folder-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`"${folder.name}" 폴더를 삭제하시겠습니까?`)) {
                  onDeleteFolder(folder.id);
                }
              }}
              title="폴더 삭제"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderManager;
