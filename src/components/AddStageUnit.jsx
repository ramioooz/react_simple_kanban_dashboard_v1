import React from 'react'
import { useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { StagesContext } from '../context/StagesContext';

const AddStageUnit = () => {

  const [adding, setAdding] = useState(false);
  // const [outSideClick_counter, setOutSideClick_Counter] = useState(0);
  const outSideClick_counter = useRef(0);

  const unitRef = useRef(null);

  const [stageName, setStageName] = useState('');

  const handleDocClick = (e) => {
    // console.log('clicked on: ', e.target);
    if (adding && unitRef.current && !unitRef.current.contains(e.target)) {

      // setOutSideClick_Counter(outSideClick_counter + 1);
      outSideClick_counter.current += 1;

      // ignore first click outside addStageUnit (because it was a click on the button that disapear to show the adding stage unit)
      if (outSideClick_counter.current == 1) {
        return;
      }
      console.log('clicked outside addStageUnit');
      setAdding(false);
      outSideClick_counter.current = 0;
    }
  }

  const { dispatch } = useContext(StagesContext)

  const handleKeyDown = async (e) => {


    if (e.key === 'Enter') {
      // console.log('enter key pressed');

      if (stageName.length < 1) {
        console.log('stageName is short. ignoring update');
      } else {
        // now add new stage to stages.. and end editing
        // console.log('updating stages..');
        await dispatch({
          type: 'ADD_STAGE',
          payload: stageName,
        })
      }

      setAdding(false);
      outSideClick_counter.current = 0;
      setStageName("");

    }
  }

  useEffect(() => {
    document.addEventListener("click", handleDocClick)
    return () => document.removeEventListener("click", handleDocClick);
  }, [adding, outSideClick_counter])

  return (
    <>
      {!adding ? <button className='add_stage_btn' onClick={() => setAdding(true)}>Add Stage</button> :
        <div ref={unitRef} className='add_stage_unit'><>
          {/* <label>AddStageUnit</label> */}
          <input
            className='add_stage_unit_label'
            placeholder='Enter Stage Name'
            value={stageName}
            onKeyDown={handleKeyDown}
            onChange={(e) => setStageName(e.target.value)}
            autoFocus
          />
        </></div>}
    </>
  )
}

export default AddStageUnit