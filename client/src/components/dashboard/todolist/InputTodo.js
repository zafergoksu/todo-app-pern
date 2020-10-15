import React, { useState } from 'react';

const InputTodo = ({ setTodosChange }) => {
    const [description, setDescription] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('jwt_token', localStorage.token);

            const body = { description };
            const response = await fetch('/users/todos', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body),
            });

            //const response = await axios.post('/todos', body);
            setDescription('');
            setTodosChange(true);
            //window.location = '/';
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <h1 className="text-center mt-5">Pern Todo List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="search"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </div>
    );
};

export default InputTodo;
