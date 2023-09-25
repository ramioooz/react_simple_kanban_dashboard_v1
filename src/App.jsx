import Stage from './components/Stage'
import AddStageUnit  from './components/AddStageUnit'
import { useState } from "react";
import { useEffect } from 'react';
import { useContext } from 'react';
import { StagesContext } from './context/StagesContext';
import Skelaton from './components/Skelaton';

function App() {

  const [loading, setLoading] = useState(true); // initial value

  const {state, dispatch} = useContext(StagesContext);

  // on app load
  // make stages available in stages context
  useEffect(() => {
    async function initFn() {

      await dispatch({type: "LOAD_STAGES"})

      await new Promise(resolve => setTimeout(resolve, 2000));

      // console.log('state stages are: ', state);
      setLoading(false);
    }

    initFn();
  }, [])

  
  return (
    <>
      {loading ? <Skelaton message='Loading..' width='500px' height='400px'/> : <div className='app'>
        {state && <div className='stages'>
          <>
            {state.map((stage, i) => ( 
              <Stage key={stage.title} title={stage.title} tasksList={stage.tasks} stageIndex={i}/>
            ))}
            <AddStageUnit/>
          </>
        </div>}
      </div>}
    </>
  )
}

export default App
