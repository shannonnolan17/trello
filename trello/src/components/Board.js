import React, { useState, useEffect } from 'react';

const Board = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(['To Do', 'In Progress', 'QA', 'Done'])
  })

  return (
    <div className='container'>
      {columns.map((col) => {
        return (
          <div className='board-lists'>
            {col}
          </div>
        )
      })}
    </div>
  );
};

export default Board;