const cors = require("cors");
const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

app.post("/register", async (req, res) =>{
  try {
    const { username, email, password, disciplineId } = req.body;
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const normalisedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();
    
    if (!normalisedEmail.endsWith("@iitgn.ac.in")) {
    return res.status(400).json({
        error: "Only IITGN email addresses are allowed."
    });
    }

    if (!normalizedUsername) {
      return res.status(400).json({
        error: "username required"
    });
    }
    if (password.length < 8) {
      return res.status(400).json({
        error: "password should have at least 8 characters"
    })
    }
    
    if (!disciplineId) {
      return res.status(400).json({
        error: "discipline required"
      });
    }

    const result = await pool.query(`
      INSERT INTO users (username, email, discipline_id, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, discipline_id;`, [normalizedUsername, normalisedEmail, disciplineId, hashed_password])

      res.status(201).json(result.rows[0]);

  } catch(err) {
    if (err.code === "23505") {
      if (err.constraint === "users_email_key") {
        return res.status(409).json({
          error: "email already exists"
        });
      }
      if (err.constraint === "users_username_key") {
        return res.status(409).json({
          error: "username already exists"
        });
      }
    }

    console.error(err);

    return res.status(500).json({
    error: "Internal server error"
    });
  }
})

app.get("/disciplines", async (req, res) => {
  
  try {
    const result = await pool.query(`
      SELECT * FROM disciplines;`);
    res.json(result.rows);

  } catch(err) {
    console.error(err);
  }

})
app.get("/completed-courses", async (req, res) => {

  try {
    const result = await pool.query(`
      SELECT 
      u.course_id,
      u.semester,
      c.course_code,
      c.name,
      c.credits,
      u.grade,
      b.name AS basket
      FROM user_courses u
      JOIN courses c
      ON u.course_id = c.id
      JOIN baskets b
      ON u.basket_id = b.id

      WHERE u.status = 'Completed'`);
      res.json(result.rows);
  } catch(err) {
    console.error(err);
  }
})

app.delete("/completed-courses", async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await pool.query(
      `DELETE FROM user_courses
       WHERE course_id = $1
       AND status = 'Completed'
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

app.post("/completed-courses", async (req, res) => {
  try {
    const { courseId, semester, basket, grade } = req.body;
    
    let basketId;
    if (basket === "All / Open Electives") {
      basketId = 8;
    } else {
      const result = await pool.query(
        "SELECT id FROM baskets WHERE name = $1",
    [basket]
      );
      basketId = result.rows[0].id;
    }
const query = `
INSERT INTO user_courses
    (user_id, course_id, semester, grade, basket_id, status)
VALUES
    (1, $1, $2, $4, $3, 'Completed')
RETURNING *;
`;

const params = [courseId, semester, basketId, grade];

const result = await pool.query(query, params);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    console.error(err.detail);
    res.status(500).json({ error: "Failed to add completed course" });
  }
});

app.get("/completed-courses/:semId", async (req, res) => {

  const sem = req.params.semId;

  try {
    const result = await pool.query(
      `SELECT 
      u.course_id AS id,
      u.grade,
      b.name AS basket,
      c.course_code,
      c.name,
      c.credits
      FROM user_courses u
      JOIN courses c
        ON u.course_id = c.id
      JOIN baskets b
        ON u.basket_id = b.id
      WHERE u.status = 'Completed' 
      AND u.semester = $1;`, [sem]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch completed courses" });
  }
});

app.get("/planned-courses", async (req, res) => {
  
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
      WHERE u.status = 'Planned';`
    );
    res.json(result.rows);
  } catch(err) {
    console.error(err);
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
    
    let basketId;
    if (basket === "All / Open Electives") {
      basketId = 8;
    } else {
      const result = await pool.query(
        "SELECT id FROM baskets WHERE name = $1",
    [basket]
      );
      basketId = result.rows[0].id;
    }

    const result = await pool.query(
  `INSERT INTO user_courses
    (user_id, course_id, semester, basket_id, status)
   VALUES
    (1, $1, $2, $3, 'Planned')
   RETURNING *`,
  [courseId, semester, basketId]
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

app.listen(port, () => {
    console.log(`My express server is finally setup on port ${port}!`)
})