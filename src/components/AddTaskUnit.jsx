import React from 'react'
import { useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { StagesContext } from '../context/StagesContext';

const AddTaskUnit = ({ stageName }) => {

  const [adding, setAdding] = useState(false);

  const outSideClick_counter = useRef(0);

  const unitRef = useRef(null);

  const [taskName, setTaskName] = useState('');

  const handleDocClick = (e) => {
    // console.log('clicked on: ', e.target);
    if (adding && unitRef.current && !unitRef.current.contains(e.target)) {

      // setOutSideClick_Counter(outSideClick_counter + 1);
      outSideClick_counter.current += 1;

      // ignore first click outside addTaskUnit (because it was a click on the button that disapear to show the adding task unit)
      if (outSideClick_counter.current == 1) {
        return;
      }
      console.log('clicked outside addTaskUnit');
      setAdding(false);
      outSideClick_counter.current = 0;
    }
  }

  const { dispatch } = useContext(StagesContext)

  const handleKeyDown = async (e) => {

    if (e.key === 'Enter') {
      // console.log('enter key pressed');

      if (taskName.length < 1) {
        console.log('taskName is short. ignoring update');
      } else {
        // now add new task to tasks.. and end editing
        // console.log('updating stages..');
        await dispatch({
          type: 'ADD_TASK',
          payload: { stageName, taskName },
        })
      }

      setAdding(false);
      outSideClick_counter.current = 0;
      setTaskName("");

    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocClick)
    return () => document.removeEventListener("click", handleDocClick);
  }, [adding, outSideClick_counter])

  return (
    <>
      {!adding ? <button className='add_stage_btn' onClick={() => setAdding(true)}>Add Task</button> :
        <div ref={unitRef} className='add_stage_unit'><>
          <input
            className='add_stage_unit_label'
            placeholder='Enter Task Name'
            value={taskName}
            onKeyDown={handleKeyDown}
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
          />

        </></div>}
    </>
  )
}

export default AddTaskUnit