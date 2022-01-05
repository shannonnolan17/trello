import React, { useState, useEffect } from 'react';
import Column from './Column';

const Board = () => {
  const [columns, setColumns] = useState(['To Do', 'In Progress', 'QA', 'Done']);
  
  return (
    <div className='container'>
      <div className='board-lists'>
        {columns.map((col) => {
          return <Column key={col} column={col} />
        })}
      </div>
    </div>
  );
};

export default Board;