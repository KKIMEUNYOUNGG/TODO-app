import React from 'react';
import './CategoryTabs.css';

const CategoryTabs = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'today', label: '오늘', icon: '📅' },
    { id: 'week', label: '이번주', icon: '📆' },
    { id: 'later', label: '나중에', icon: '⏰' }
  ];

  return (
    <div className="category-tabs">
      {categories.map(category => (
        <button
          key={category.id}
          className={`tab-button ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <span className="tab-icon">{category.icon}</span>
          <span className="tab-label">{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
