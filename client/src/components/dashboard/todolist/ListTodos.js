import React, { useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
    const [todos, setTodos] = useState([]);
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`/users/todos/${id}`, {
                method: 'DELETE',
                headers: { 'jwt_token': localStorage.token }
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }

    //const getTodos = async () => {
        //try {
            //const response = await fetch('/users/todos');
            //const jsonData = await response.json();
            //console.log();
            //setTodos(jsonData);
        //} catch (err) {
            //console.error(err.message);
        //}
    //};

    useEffect(() => {
        setTodos(allTodos);
    }, [allTodos]);

    return (
        <div>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}

                    {(todos.length !== 0 && todos[0].todo_id !== null) && todos.map(todo => {
                        return (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td>
                                    <EditTodo todo={todo} setTodosChange={setTodosChange} />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTodo(todo.todo_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ListTodos;
