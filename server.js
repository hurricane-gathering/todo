const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // 导入 CORS 中间件


const app = express();
app.use(cors());
// 解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gdjy2024', // 修改为你的 MySQL 密码
    database: 'todo_app'
});

connection.connect();

// 获取所有的 ToDo 项
app.get('/todos', (req, res) => {
    connection.query('SELECT * FROM todos', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
// 新增 ToDo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    connection.query('INSERT INTO todos (title) VALUES (?)', [title], (error, results) => {
        if (error) throw error;
        res.json({ id: results.insertId, title, completed: false });
    });
});
// 完成 ToDo
app.put('/todos/:id/completed', (req, res) => {
    const id = req.params.id;
    connection.query('UPDATE todos SET completed = true WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Todo marked as completed' });
    });
});
// 恢复 ToDo
app.put('/todos/:id/restore', (req, res) => {
    const id = req.params.id;
    connection.query('UPDATE todos SET completed = false WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Todo restored' });
    });
});

// 删除 ToDo
app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    connection.query('DELETE FROM todos WHERE id = ?', [todoId], (error, results) => {
        if (error) throw error;
        res.status(200).json({ message: 'Todo deleted successfully' });
    });
});

// 更新 ToDo
// 更新待办事项的标题
app.put('/todos/:id/title', (req, res) => {
    const todoId = req.params.id;
    const newTitle = req.body.title;

    connection.query('UPDATE todos SET title = ? WHERE id = ?', [newTitle, todoId], (error, results) => {
        if (error) throw error;
        res.status(200).json({ message: 'Todo title updated successfully' });
    });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
