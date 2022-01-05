import React, { useState, useEffect } from 'react';

const Card = (column, setTasks, tasks) => {
  const [task, setTask] = useState({});
  const [newTask, setCreateTask] = useState('');

  const handleChange = (event) => {
    setCreateTask(event.target.value);
  }

  const handleSubmit = () => {
    setTask({name: newTask, column });
  }

  const dragStartHandler = (event, id) => {
    console.log('dragstart:',id);
    event.dataTransfer.setData("id", id);
  }

  return (
    <div>
      <div>
        {task.name ? <div draggable onDragStart={(e) => { dragStartHandler(e, task.name) }} className='card-container draggable'> { task.name } </div> :
          <>
            <input type="textarea" name="textValue" onChange={handleChange} />
            <div onClick={handleSubmit}>
              Add Card
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Card;