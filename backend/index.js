const cors = require("cors");
const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smarttrack',
  password: 'postgresql@93901',
  port: 5432,
});

app.get("/completed-courses", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM user_courses
       WHERE status = 'Completed';`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch completed courses" });
  }
});

app.post("/completed-courses", async (req, res) => {
  try {
    const { courseId, grade, semester } = req.body;

    const result = await pool.query(
      `INSERT INTO user_courses (user_id, course_id, grade, semester, status)
       VALUES (1, $1, $2, $3, 'Completed')
       RETURNING *`,
      [courseId, grade, semester]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add completed course" });
  }
});

app.get("/planned-courses/:semester", async (req, res) => {
  
  const sem = req.params.semester;
  
  try {
    const result = await pool.query(
      `SELECT 
      u.course_id AS id,
      b.name AS basket,
      c.course_code,
      c.name,
      c.credits
      FROM user_courses u
      JOIN courses c
        ON u.course_id = c.id
      JOIN baskets b
        ON u.basket_id = b.id
      WHERE u.status = 'Planned' 
      AND u.semester = $1;`, [sem]
    );
    res.json(result.rows);
  } catch(err) {
    console.error(err);
  }
});

app.post("/planned-courses", async (req, res) => {
  try {
    const { courseId, semester, basket } = req.body;

    const result = await pool.query(
      `INSERT INTO user_courses (user_id, course_id, semester, basket_id, status)
       SELECT
         1,
         $1,
         $2,
         b.id,
         'Planned'
       FROM baskets b
       WHERE b.name = $3
       RETURNING *;`,
      [courseId, semester, basket]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add planned course" });
  }
});

app.delete("/planned-courses", async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await pool.query(
      `DELETE FROM user_courses
       WHERE course_id = $1
       AND status = 'Planned'
       RETURNING *;`,
      [courseId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

app.get('/courses', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
              c.id,
              c.course_code,
              c.name,
              c.credits,
              d.code AS discipline,
              ARRAY_AGG(b.name ORDER BY b.name) AS baskets
            FROM courses c
            JOIN course_baskets cb
              ON c.id = cb.course_id
            JOIN baskets b
              ON cb.basket_id = b.id
            LEFT JOIN disciplines d
              ON cb.discipline_id = d.id
            GROUP BY
              c.id,
              c.course_code,
              c.name,
              c.credits,
              d.code;`);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/baskets', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM baskets`);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

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