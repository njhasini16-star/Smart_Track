const express = require('express')
const app = express();
const port = 3000;
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smarttrack',
  password: 'postgresql@93901',
  port: 5432,
});

let sql = 'SELECT * FROM Completed_courses';

function database(sql) {pool.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result.rows);
});
}

displayTable(sql);

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

app.get('/courses', (req, res) => {
    res.send('This is the course catalog page')
})

app.get('/courses/completed-courses', async (req,res) => {
    const result = await pool.query('')
    res.send('Here, all completed courses can be accessed!')
})
app.get('/courses/semesters/:semId/planned-courses', (req,res) => {
    const semId = req.params.semId;
    res.send(`Here, planned courses for semester-${semId} can be accessed!`)
})
app.get('/courses/semesters/:semId/completed-courses', (req,res) => {
    const semId = req.params.semId;
    res.send(`Here, completed courses for semester-${semId} can be accessed!`)
})
app.listen(port, () => {
    console.log(`My express server is finally setup on port ${port}!`)
})