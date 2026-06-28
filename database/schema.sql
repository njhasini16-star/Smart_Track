CREATE TABLE disciplines (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE baskets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    discipline_id INT REFERENCES disciplines(id)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(10) UNIQUE,
    name VARCHAR(255) NOT NULL,
    credits INT,
    created_by INT REFERENCES users(id)
);

CREATE TABLE course_baskets (

    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id),
    basket_id INT REFERENCES baskets(id),
    discipline_id INT REFERENCES disciplines(id),
    UNIQUE (course_id, basket_id, discipline_id)
);

CREATE TABLE user_courses (
    user_id INT REFERENCES users(id),
    course_id INT REFERENCES courses(id),
    grade VARCHAR(2),
    semester INT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Planned', 'Completed')),

    PRIMARY KEY (user_id, course_id)
);


