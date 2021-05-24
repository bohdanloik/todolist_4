import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId:string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList:(todolistId: string) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    };

    return <div>

        <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
        <AddItimForm id={props.id} addTask={props.addTask}/>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id,  e.currentTarget.checked, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter':''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? 'active-filter':''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter':''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}

type AddItimFormPropsType = {
    addTask: (title: string, todolistId: string) => void
    id: string
};
function AddItimForm(props: AddItimFormPropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if(title.trim() !== ''){
            props.addTask(title.trim(), props.id);
            setTitle('');
        }   else {
            setError('Title is reqiured');
        }
    }

    return <div>
                <input value={title}
                    onChange={ onChangeHandler }
                    onKeyPress={ onKeyPressHandler }
                    className={error ? 'error': ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
    
}
