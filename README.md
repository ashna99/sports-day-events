# sports-day-event-registration

Steps to run locally:

UI:
1. cd frontend
2. npm i
3. npm run start
4. for tests - run npm test
5. After npm start- there will be a login page. For user logging for 1st time, enter username and password and remember them for subsequent authentication.

Backend
1. cd backend
2. npm i
3. npm run dev

MYSQL:
Commands to create MYSQL Tables:

USE intuit_demo_db;

-- SELECT * FROM users;
-- SELECT * FROM events;
-- SELECT * FROM user_events;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_on DATETIME DEFAULT NOW(),
    active BOOLEAN DEFAULT true
);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_category VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_on DATETIME DEFAULT NOW(),
    modified_on DATETIME DEFAULT NOW() ON UPDATE NOW(),
    UNIQUE (event_name, event_category)
);

CREATE TABLE user_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    UNIQUE (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

INSERT INTO users (username, password) VALUES
('johndoe', 'hashed_password_1'),
('janedoe', 'hashed_password_2');

INSERT INTO events (event_name, event_category, start_time, end_time) VALUES
('Butterfly 100M', 'Swimming', '2022-12-17 13:00:00', '2022-12-17 14:00:00'),
('Backstroke 100M', 'Swimming', '2022-12-17 13:30:00', '2022-12-17 14:30:00'),
('Freestyle 400M', 'Swimming', '2022-12-17 15:00:00', '2022-12-17 16:00:00'),
('High Jump', 'Athletics', '2022-12-17 13:00:00', '2022-12-17 14:00:00'),
('Triple Jump', 'Athletics', '2022-12-17 16:00:00', '2022-12-17 17:00:00'),
('Long Jump', 'Athletics', '2022-12-17 17:00:00', '2022-12-17 18:00:00'),
('100M Sprint', 'Athletics', '2022-12-17 17:00:00', '2022-12-17 18:00:00'),
('Lightweight 60kg', 'Boxing', '2022-12-17 18:00:00', '2022-12-17 19:00:00'),
('Middleweight 75 kg', 'Boxing', '2022-12-17 19:00:00', '2022-12-17 20:00:00'),
('Heavyweight 91kg', 'Boxing', '2022-12-17 20:00:00', '2022-12-17 22:00:00');

INSERT INTO user_events (user_id, event_id) VALUES
(1, 1),
(1, 3),
(1, 5);
