import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AiFillBackward, AiFillForward, AiFillDelete } from "react-icons/ai";
import { StagesContext } from '../context/StagesContext';


const Task = ({ task, stageIndex }) => {

    const { state, dispatch } = useContext(StagesContext);

    const handleMoveForward = async () => {
        console.log('move forward');

        await dispatch({ type: "MOVE_TASK_FORWARD", payload: { task, stageIndex } });
    }
    const handleMoveBack = async () => {
        console.log('move back');

        await dispatch({ type: "MOVE_TASK_BACKWARD", payload: { task, stageIndex } });
    }

    const handleDeleteTask = async () => {
        console.log('delete task');

        await dispatch({ type: "DELETE_TASK", payload: { task, stageIndex } });
    }

    // useEffect(() => {
    //     console.log('stageIndex: ', stageIndex);
    //     console.log('state.length: ', state.length);
    // }, [])

    return (
        <div className="stage_task">
            <div className='task_header'>
                <div>{task}</div>

                <div className='tooltip'>
                    <AiFillDelete className='task_header_icon' onClick={handleDeleteTask}/>
                    <span className="tooltiptext">Delete Task</span>
                </div>

            </div>
            <div className='stage_task_btns_div'>

                <div className='tooltip'>
                    <AiFillBackward className="move_task_btn" onClick={handleMoveBack} style={{ display: (stageIndex == 0) ? "none" : "block" }} />
                    <span className="tooltiptext">Move Backword</span>
                </div>
                <div></div>
                <div className='tooltip'>
                    <AiFillForward className="move_task_btn" onClick={handleMoveForward} style={{ display: (stageIndex == state.length - 1) ? "none" : "block" }} />
                    <span className="tooltiptext">Move Forward</span>
                </div>

            </div>
        </div>

    )
}

export default Task