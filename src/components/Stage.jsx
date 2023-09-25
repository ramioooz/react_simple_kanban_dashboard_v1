import React from 'react'
import AddTaskUnit from './AddTaskUnit';
import Task from './Task';
import { AiFillDelete } from 'react-icons/ai'
import { useContext } from 'react';
import { StagesContext } from '../context/StagesContext';

const Stage = ({ title = 'stageTitle_ph', tasksList = [], stageIndex }) => {

  const {dispatch} = useContext(StagesContext);
  
  // const tasks = [
  //   // { task: "Do something" },
  //   // { task: "Go to school" },
  //   // { task: "Wake up at 5am" },
  // ]

  const tasks = [
    // "Do something",
    // "Go to school",
    // "Wake up at 5am",
  ]

  const handleDeleteStage = async () => {
    console.log('delete stage');

    await dispatch({ type: "DELETE_STAGE", payload: { stageIndex } });
  }

  return (
    <div className='stage'>
      <div className="stage_header">
        <div>{title}</div>

        <div className='tooltip'>
          <AiFillDelete className='stage_header_icon'onClick={handleDeleteStage} />
          <span className="tooltiptext">Delete Stage</span>
        </div>

      </div>
      {tasksList && tasksList.map((task, i) => (
        <Task task={task} key={i} stageIndex={stageIndex} />
      ))}
      {/* <button className='add_stage_btn'>Add Task</button> */}
      <div style={{ height: "10px" }}></div>
      <AddTaskUnit stageName={title} />


    </div>
  )
}

export default Stage