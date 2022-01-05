import React, { useState, useEffect } from 'react';
import Card from './Card'
import times from 'lodash/times'

const Column = (col) => {
  const [newCard, setNewCard] = useState(false);
  const [tasks, setTasks] = useState({});

  const addCard = () => {
    setNewCard(true)
  }

  const dragOverHandler = (event) => {
    event.preventDefault();
  }

  const onDropHandler = (event, column) => {
    let id = event.dataTransfer.getData("id");
       
    let task = Object.keys(tasks).filter((task) => {
        if (task.name == id) {
            task.column = column;
        }
        return task;
    });

    setTasks({...tasks, task})
  }

  const handleNewTask = (task) => {
    setTasks({...tasks, task});
  }

  return (
    <div 
      className='board-list droppable'
      onDragOver={e => { dragOverHandler(e) }}
      onDrop={e => { onDropHandler(e, col) }}>
      <div>
        {col.column}
      </div>
      <div>
        {tasks && Object.keys(tasks).map((task) => {
          return <Card column={task.column} setTasks={setTasks} tasks />
        })}
      </div>
      <div>
        {newCard && <Card column={col.column} setTasks={handleNewTask} tasks />}
      </div>
      <div className='new-card-button' onClick={addCard}>
        + Add another card
      </div>
    </div>
  )
};

export default Column;