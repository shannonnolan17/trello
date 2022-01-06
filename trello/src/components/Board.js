import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Board = () => {
  const [columns] = useState(['To Do', 'In Progress', 'QA', 'Done']);
  const [newCard, setNewCard] = useState(false);
  const [currentCol, setCurrentCol] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setCreateTask] = useState('');

  const handleSubmit = (col) => {
    if (newTask === '') {
      return alert('Please enter a title for this card')
    }

    setNewCard(false);
    setTasks([...tasks, { name: newTask, column: col }]);
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

  const onDrop = (event, col) => {
    const id = JSON.parse(event.dataTransfer.getData("id"));
    const oldTask = tasks.find(element => element.name === id.name)
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
              onDragOver={(e) => {onDragOver(e)}}
              onDrop={(e) => {onDrop(e, col)}}>
              <div className='title'>
                {col}
              </div>
              <div>
                {tasks.length > 0 && tasks.map((task) => (
                  <Task
                    key={task}
                    task={task}
                    dragStartHandler={dragStartHandler}
                    col={col}
                    onDrop={onDrop}
                  />
                ))}
              </div>
              <div>
                {newCard && currentCol === col &&
                  <NewTask 
                    toggleCard={toggleCard}
                    handleSubmit={handleSubmit}
                    col={col}
                    columns={columns}
                    newCard={newCard}
                    currentCol={currentCol}
                    setCreateTask={setCreateTask}
                  />
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

const Task = ({task, dragStartHandler, col, onDrop}) => {
  if (task.column === col) {
    return(
      <div 
        draggable
        onDragStart={(e) => { dragStartHandler(e, task) }}
        onDrop={(e) => { onDrop(e, col) }}
        id={task}
        className='card-container'> 
        {task.name} 
      </div> 
    )
  }
  return null;
};

Task.propTypes = {
  task: PropTypes.object,
  dragStartHandler: PropTypes.func,
  onDrop: PropTypes.func,
  col: PropTypes.string,
};

const NewTask = ({toggleCard, handleSubmit, col, setCreateTask}) => {
  const handleChange = (event) => {
    setCreateTask(event.target.value);
  };

  return(
    <div className='input-container'>
      <textarea 
        className="textarea"
        name="textValue"
        rows="3"
        placeholder="Enter a title for this card..."
        onChange={(e) => handleChange(e)} />
      <div className='button-container'>
        <div 
          className='button'
          onClick={() => handleSubmit(col)}>
          Add Card
        </div>
        <div className='toggle' onClick={() => toggleCard(false, col)}>X</div>
      </div>
    </div>
  )
};

NewTask.propTypes = {
  toggleCard: PropTypes.func,
  handleSubmit: PropTypes.func,
  setCreateTask: PropTypes.func,
  col: PropTypes.string,
  columns: PropTypes.array,
};

export default Board;
