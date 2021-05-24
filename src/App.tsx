import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { isPropertySignature } from 'typescript';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id : string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = taskObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id != id);
        taskObj[todolistId] = filteredTasks;
        setTasks({...taskObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = taskObj[todolistId];
        let newTasks = [task, ...tasks];
        taskObj[todolistId] = newTasks;
        setTasks({...taskObj});
    }
    function changeStatus(taskId:string, isDone: boolean, todolistId: string) {
        let tasks = taskObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if(task) {
            task.isDone = isDone;
            setTasks({...taskObj});
        }
        
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if(todolist) {
            todolist.filter = value;
            setTodolist([...todolists])
        }
    }
    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolist]= useState<Array<TodolistType>>([
        { id: todolistId1, title: "What to learn", filter: "all"},
        { id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let removeTodoList = (todolistId: string) => {
        let filteredTodoList = todolists.filter(tl => tl.id !== todolistId);
        setTodolist(filteredTodoList);

        delete taskObj[todolistId];
        setTasks({...taskObj})
    }

    let [taskObj, setTasks] = useState({
        [todolistId1] : [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
        ],
        [todolistId2] : [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true }
        ]
    });


    return (
        <div className="App">
            <AddItemForm addItem={(title: string)=>{alert('title')}} />
            {
                todolists.map((tl) => {

                    let tasksForTodolist = taskObj[tl.id];
                    
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }

                    return  <Todolist 
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList} />
                })
            }
            
        </div>
    );
}

export default App;
