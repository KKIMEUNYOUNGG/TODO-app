import React from 'react';
import { getToday, formatDateKorean, getDayOfWeek } from '../utils/dateUtils';
import './Dashboard.css';

const Dashboard = ({ todayTodos, pendingCount }) => {
  const today = getToday();
  const completedCount = todayTodos.filter(todo => todo.completed).length;
  const totalCount = todayTodos.length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>오늘의 일정</h1>
        <p className="dashboard-date">
          {formatDateKorean(today)} ({getDayOfWeek(today)}요일)
        </p>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{totalCount}</div>
          <div className="stat-label">전체 할일</div>
        </div>
        <div className="stat-card">
          <div className="stat-number pending">{pendingCount}</div>
          <div className="stat-label">미완료</div>
        </div>
        <div className="stat-card">
          <div className="stat-number completed">{completedCount}</div>
          <div className="stat-label">완료</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
