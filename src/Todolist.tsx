import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, {ChangeEvent, ChangeEventHandler} from 'react';
import { AddItemForm } from './AddItemForm';
import {FilterValuesType} from './App';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
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
    changeTaskTitle: (taskId:string, newValue: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList:(todolistId: string) => void
    changeTodoListTitle:(id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    };
    const changeTodoListTitle = (newTitle:string) => {
        props.changeTodoListTitle(props.id, newTitle);
    };

    const addTask =(title: string) => {
        props.addTask(title,props.id);
    }
    return <div>

        <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>   <IconButton aria-label="delete" onClick={removeTodoList}>
            <Delete />
        </IconButton>
        </h3>

        
        <AddItemForm addItem={addTask}/>
        
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id);
                    const onChangeStatusHadler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id,  e.currentTarget.checked, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id,  newValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" onChange={onChangeStatusHadler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button  variant={props.filter === 'all' ? 'contained':'text'} onClick={ onAllClickHandler }>All</Button>
            <Button color={'primary'} variant={props.filter === 'active' ? 'contained':'text'} onClick={ onActiveClickHandler }>Active</Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained':'text'} onClick={ onCompletedClickHandler }>Completed</Button>
        </div>
    </div>
}
