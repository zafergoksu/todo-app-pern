import React, { useState } from 'react';

const EditTodo = ({ todo, setTodosChange }) => {
    const [description, setDescription] = useState(todo.description);

    // edit description function
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('jwt_token', localStorage.token);
            const body = JSON.stringify({ description });
            const response = await fetch(`/users/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: myHeaders,
                body,
            });

            setTodosChange(true);
            //window.location = '/';
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {/* Trigger the modal with a button */}
            <button
                type="button"
                className="btn btn-info btn-warning"
                data-toggle="modal"
                data-target={`#id${todo.todo_id}`}
                onClick={() => setDescription(todo.description)}
            >
                Edit
            </button>

            {/* Modal */}
            <div id={`id${todo.todo_id}`} className="modal fade" role="dialog">
                <div className="modal-dialog">
                    {/* Modal content */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                                onClick={(e) => updateDescription(e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTodo;
