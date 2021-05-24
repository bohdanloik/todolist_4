import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItimFormPropsType = {
    addTask: (title: string, todolistId: string) => void;
    id: string;
};
export function AddItimForm(props: AddItimFormPropsType) {
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
            props.addTask(title.trim(), props.id);
            setTitle('');
        } else {
            setError('Title is reqiured');
        }
    };

    return <div>
        <input value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? 'error' : ''} />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>;

}
