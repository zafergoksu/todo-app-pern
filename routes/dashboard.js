const router = require('express').Router();
const authorize = require('../middleware/authorize');
const pool = require('../db');

router.get('/todos', authorize, async (req, res) => {
    try {
        const user = await pool.query(
            'SELECT * FROM users LEFT JOIN todo ON users.user_id = todo.user_id WHERE users.user_id = $1',
            [req.user.id]
        );

        res.json(user.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/todos', authorize, async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (user_id, description) VALUES($1, $2) RETURNING *',
            [req.user.id, description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo

router.get('/todos/:id', authorize, async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            'SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2',
            [id, req.user.id]
        );

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo

router.put('/todos/:id', authorize, async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
            [description, id, req.user.id]
        );

        if (updateTodo.rows.length === 0) {
            return res.status(401).json({ error: 'You are not authorized' });
        }

        res.json('Todo was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo

router.delete('/todos/:id', authorize, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );

        if (deleteTodo.rows.length === 0) {
            return res.status(401).json({ error: 'You are not authorized' });
        }

        res.send('Todo was deleted!');
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;
