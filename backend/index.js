const cors = require("cors");
const express = require('express');
const app = express();

require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const port = process.env.PORT || 3000;
const { Pool } = require('pg');

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const JWT_secret = process.env.JWT_secret;

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({message: "Logged out successfully"});
})

const authenticateJWT = (req, res, next) => {
     const token = req.cookies.token;

     if (!token) {
       return res.status(401).json({ message: 'Token missing' });
     }

     try {
   const decoded = jwt.verify(token, JWT_secret);
   req.user = decoded;

   next();
 } catch (error) {
   return res.status(403).json({ message: 'Invalid or expired token' });
 }
};


app.post("/login", async (req, res) => {
  console.log("Login endpoint hit");
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, discipline_id, password_hash
       FROM users
       WHERE email = $1;`,
      [normalizedEmail]
    );
    console.log(result.rows);

    if (!result.rows[0]) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const hashedPassword = result.rows[0].password_hash;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const payload = {
      id: result.rows[0].id,
      disciplineId: result.rows[0].discipline_id,
    };

    if (!JWT_secret) {
      throw new Error("JWT_SECRET is not defined");
    }
    console.log("JWT secret:", JWT_secret);

    const token = jwt.sign(payload, JWT_secret, {
      expiresIn: "7d",
    });
    console.log("Token created");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("Cookie set");
    res.status(200).json({
      message: "User logged in successfully",
    });

  } catch (err) {
    console.error("LOGIN ERROR:");
    console.error(err);
    console.error(err.stack);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.get("/users", async(req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users;`);
      res.json(result.rows);

  } catch(err) {
    console.error(err);
  }
})

app.get("/me", authenticateJWT, async (req, res) => {
  try {
    const result = await pool.query(
        "SELECT id, username, email, discipline_id, roll_number FROM users WHERE id = $1",
        [req.user.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        error: "User not found"
        });
    }
    res.status(200).json(result.rows[0]);
  } catch(err) {
    console.error(err);
    res.status(500).json({error: "Internal server error"})
  }
});

app.post("/register", async (req, res) =>{
  try {
    const { username, email, password, disciplineId, rollnum } = req.body;
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();
    const normalizedRollnum = rollnum.trim();

    if (!normalizedEmail.endsWith("@iitgn.ac.in")) {
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
    if (!/^\d{8}$/.test(normalizedRollnum)) {
    return res.status(400).json({
        error: "Invalid roll number"
    });
}
    const joiningYear = 2000 + Number(normalizedRollnum.slice(0, 2));
    const today = new Date();
    const currentYear = today.getFullYear();
    
    if (joiningYear < 2008 || currentYear < joiningYear) {
      return res.status(400).json({
        error: "Invalid roll number"
    });
    }
    const result = await pool.query(`
      INSERT INTO users (username, email, discipline_id, password_hash, roll_number)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, discipline_id, roll_number;`, [normalizedUsername, normalizedEmail, disciplineId, hashed_password, normalizedRollnum])

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
      if (err.constraint === "users_roll_number_key") {
        return res.status(409).json({
          error: "Roll number already exists"
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
app.get("/completed-courses", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
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
      WHERE u.status = 'Completed'
      AND u.user_id = $1`, [userId]);
      res.json(result.rows);
  } catch(err) {
    console.error(err);
  }
})

app.delete("/completed-courses", authenticateJWT, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `DELETE FROM user_courses
       WHERE course_id = $1
       AND status = 'Completed'
       AND user_id = $2
       RETURNING *;`,
      [courseId, userId]
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

app.post("/completed-courses", authenticateJWT, async (req, res) => {
  try {
    const { courseId, semester, basket, grade } = req.body;
    const userId = req.user.id;
    
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
    ($5, $1, $2, $4, $3, 'Completed')
RETURNING *;
`;

const params = [courseId, semester, basketId, grade, userId];

const result = await pool.query(query, params);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    console.error(err.detail);
    res.status(500).json({ error: "Failed to add completed course" });
  }
});

app.get("/completed-courses/:semId", authenticateJWT, async (req, res) => {

  const sem = req.params.semId;
  const userId = req.user.id;

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
      AND u.semester = $1
      AND u.user_id = $2;`, [sem, userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch completed courses" });
  }
});

app.get("/planned-courses", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
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
      AND u.user_id = $1;`, [userId]
    );
    res.json(result.rows);
  } catch(err) {
    console.error(err);
  }
});

app.get("/planned-courses/:semester", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
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
      AND u.semester = $1
      AND u.user_id = $2;`, [sem, userId]
    );
    res.json(result.rows);
  } catch(err) {
    console.error(err);
  }
});

app.post("/planned-courses", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
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
    ($4, $1, $2, $3, 'Planned')
   RETURNING *`,
  [courseId, semester, basketId, userId]
);
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add planned course" });
  }
});

app.delete("/planned-courses", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  try {
    const { courseId } = req.body;

    const result = await pool.query(
      `DELETE FROM user_courses
       WHERE course_id = $1
       AND status = 'Planned'
       AND user_id = $2
       RETURNING *;`,
      [courseId, userId]
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

app.get('/time-slots', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM time_slots`)
    
    res.json(result.rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.get('/course-offerings', async (req, res) => {
  const { academic_year, term } = req.query;
  try {
    const result = await pool.query(`
      SELECT 
      co.id,
      co.course_id,
      c.course_code,
      c.name AS course,
      co.academic_year,
      co.term,
      co.language,
      ARRAY_AGG(os.slot_code ORDER BY os.slot_code) AS slots
      FROM course_offerings co
      JOIN courses c
      ON c.id = co.course_id
      JOIN offering_schedule AS os
      ON os.offering_id = co.id
      WHERE co.academic_year = $1
        AND co.term = $2
      GROUP BY
        co.id,
        co.course_id,
        c.course_code,
        c.name,
        co.term,
        co.academic_year,
        co.language
      ORDER BY c.course_code;
      `, [academic_year, term]);
      res.json(result.rows);
  } catch(err) {
    console.error(err);  
    res.status(500).json({ error: "Internal server error" });
  }
})

app.listen(port, () => {
    console.log(`My express server is finally setup on port ${port}!`)
})