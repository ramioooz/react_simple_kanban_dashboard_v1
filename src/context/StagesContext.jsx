import { createContext, useReducer } from "react";

const stagesReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_STAGES":
            {
                // now mode - get storedStages from localStorage
                const storedStages = JSON.parse(localStorage.getItem("storedStages")) || [];

                // here we make stages available in the context
                // let updatedStages = action.payload;
                let updatedStages = storedStages;
                // console.log('updatedStages: ', updatedStages);
                return updatedStages;
            }
        case "ADD_STAGE":
            {
                // check if stage is not in stages list
                let matchingStage = state.find((s) => s.title.toLowerCase() == action.payload.toLowerCase());
                if (!matchingStage) {
                    let updatedStages = JSON.parse(JSON.stringify(state))
                    // console.log('updatedStages: ', updatedStages);
                    updatedStages.push({
                        title: action.payload,
                        tasks: []
                    });
                    // now mode - update localStorage
                    localStorage.setItem('storedStages', JSON.stringify(updatedStages));
                    return updatedStages;
                } else {
                    return state;
                }
            }
        case "ADD_TASK":
            {
                let updatedStages = JSON.parse(JSON.stringify(state));
                // console.log('udatedStages: ', updatedStages);
                // console.log('payload is : ', action.payload)
                updatedStages.map((stage) => {
                    if (stage.title == action.payload.stageName) {
                        stage.tasks.push(action.payload.taskName);
                    }
                    return stage;
                })
                // now mode - update localStorage
                localStorage.setItem('storedStages', JSON.stringify(updatedStages));
                return updatedStages;
            }
        case "MOVE_TASK_FORWARD": {
            // here we move task from current stage to next stage (if applicable)
            // console.log('action.payload: ', action.payload);
            const { task, stageIndex } = action.payload;

            if (stageIndex == state.length - 1) {
                console.log('move_task_forward: task cant move any further');
                return state;
            }
            // here I should do the following
            // clone stages array
            // remove task from current stage tasks 
            // move task to array of next stage tasks
            let updatedStages = JSON.parse(JSON.stringify(state));
            updatedStages = updatedStages.map((stage, i) => {
                let tasks = stage.tasks;
                if (stageIndex == i) {
                    // remove task
                    tasks = tasks.filter((t) => t != task);
                    stage.tasks = tasks;
                }
                if (stageIndex + 1 == i) {
                    // put task
                    tasks.push(task);
                }
                stage.tasks = tasks;
                return stage;
            });
            // now mode - update localStorage
            localStorage.setItem('storedStages', JSON.stringify(updatedStages));
            return updatedStages;
        }
        case "MOVE_TASK_BACKWARD": {
            // here we move task from current stage to previous stage (if applicable)
            // console.log('action.payload: ', action.payload);
            const { task, stageIndex } = action.payload;

            if (stageIndex == 0) {
                console.log('move_task_backward: task cant move any backward');
                return state;
            }
            // here I should do the following
            // clone stages array
            // remove task from current stage tasks 
            // move task to array of previous stage tasks
            let updatedStages = JSON.parse(JSON.stringify(state));
            updatedStages = updatedStages.map((stage, i) => {
                let tasks = stage.tasks;
                if (stageIndex == i) {
                    // remove task
                    tasks = tasks.filter((t) => t != task);
                    stage.tasks = tasks;
                }
                stage.tasks = tasks;
                return stage;
            });
            updatedStages = updatedStages.map((stage, i) => {
                let tasks = stage.tasks;
                if (stageIndex - 1 == i) {
                    // put task
                    tasks.push(task);
                }
                stage.tasks = tasks;
                return stage;
            });
            // now mode - update localStorage
            localStorage.setItem('storedStages', JSON.stringify(updatedStages));
            return updatedStages;
        }
        case "DELETE_TASK": {
            const { task, stageIndex } = action.payload;

            let updatedStages = JSON.parse(JSON.stringify(state));
            updatedStages = updatedStages.map((stage, i) => {
                let tasks = stage.tasks;
                if (stageIndex == i) {
                    // remove task
                    tasks = tasks.filter((t) => t != task);
                    stage.tasks = tasks;
                }
                stage.tasks = tasks;
                return stage;
            });

            // now mode - update localStorage
            localStorage.setItem('storedStages', JSON.stringify(updatedStages));
            return updatedStages;
        }

        case "DELETE_STAGE": {
            const { stageIndex } = action.payload;

            let updatedStages = JSON.parse(JSON.stringify(state));
            updatedStages = updatedStages.filter((stage, i) => stageIndex != i);
            
            // now mode - update localStorage
            localStorage.setItem('storedStages', JSON.stringify(updatedStages));
            return updatedStages;
        }


        default:
            return state;
    }
};

export const StagesContext = createContext();

export const StagesContextProvider = ({ children }) => {
    const initialState = [];
    const [state, dispatch] = useReducer(stagesReducer, initialState);

    return (
        <StagesContext.Provider value={{ state, dispatch }}>
            {children}
        </StagesContext.Provider>
    );
}