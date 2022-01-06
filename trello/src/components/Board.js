import React, { useState } from 'react';

const Board = () => {
  const [columns] = useState(['To Do', 'In Progress', 'QA', 'Done']);
  const [newCard, setNewCard] = useState(false);
  const [currentCol, setCurrentCol] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setCreateTask] = useState('');

  const handleChange = (event) => {
    setCreateTask(event.target.value);
  };

  const handleSubmit = (event, col, position) => {
    console.log(event)
    if (event.target.value === '') {
      return alert('Please enter a title for this card')
    }

    setNewCard(false);
    setTasks([...tasks, { name: newTask, column: col, position }]);
    setCreateTask('');
    return tasks;
  };

  const dragStartHandler = (event, id) => {
    const data = JSON.stringify(id)
    event.dataTransfer.setData("id", data);
  };

  const toggleCard = (newCard, col) => {
    setNewCard(newCard);
    setCurrentCol(col);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (ev, col) => {
    console.log(ev, 'ev ')
    const id = JSON.parse(ev.dataTransfer.getData("id"));
    const oldTask = tasks.find(element => element.name === id.name)

    if (id.column === col) {
      const oldTaskIndex = tasks.indexOf(oldTask);
      // console.log(oldTaskIndex, 'oldTaskIndex')
      const newTaskIndex = tasks.indexOf(id);
      // console.log(newTaskIndex, 'newTaskIndex')
      tasks.splice(oldTaskIndex, 0, newTaskIndex);
    }
    const newTask = oldTask.column = col
  
    setTasks([...tasks, newTask]);
  };

  return (
    <div className='container'>
      <div className='board-lists'>
        {columns.map((col) => {
          return(
            <div
              key={col}
              className='board-list'
              onDragOver={e => { onDragOver(e) }}
              onDrop={e => { onDrop(e, col) }}>
              <div className='title'>
                {col}
              </div>
              <div>
                {tasks.length > 0 && tasks.map((task) => {
                  if(task.column === col) {
                    return (
                      <div draggable onDragStart={(e) => { dragStartHandler(e, task) }} onDrop={e => { onDrop(e, col) }} className='card-container'> 
                        {task.name} 
                      </div> 
                    )
                  }
                })}
              </div>
              <div>
                {newCard && currentCol === col &&
                  <div className='input-container'>
                    <textarea className='textarea' name="textValue" rows="3" placeholder="Enter a title for this card..." onChange={e => handleChange(e)} />
                    <div className='button-container'>
                      <div className='button' onClick={(e) => handleSubmit(e, col, columns.indexOf(col))}>
                        Add Card
                      </div>
                      <div className='toggle' onClick={() => toggleCard(false, col)}>X</div>
                    </div>
                  </div>
                }
              </div>
              <div className='new-card-button' onClick={() => toggleCard(true, col)}>
                + Add another card
              </div>
            </div>)
          })}
      </div>
    </div>
  )
};

export default Board;
