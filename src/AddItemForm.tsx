import { Button, TextField } from '@material-ui/core';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }; 

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is reqiured');
        }
    };

    return <div>
        <TextField value={title}
            variant={'outlined'}
            label={'Type Value'}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error} 
            helperText={error}/>
            
        <Button onClick={addTask} variant={'contained'} color={'primary'}>+</Button>
    </div>;
}
