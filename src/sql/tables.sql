-- create database sql_crm;
USE sql_crm;

-- CREATE TABLE owner (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     owner VARCHAR(40)
-- );

-- CREATE TABLE country (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     country VARCHAR(40)
-- );

-- CREATE TABLE email_type(
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     email_type VARCHAR(1)
-- );

-- CREATE TABLE client(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     last VARCHAR(40),
--     first VARCHAR(40),
--     email VARCHAR(40),
--     sold BOOLEAN,
--     date VARCHAR(40),
--     email_type_id INT,
--     owner_id INT,
--     country_id INT,

--     FOREIGN KEY(email_type_id) REFERENCES email_type(id),
--     FOREIGN KEY(owner_id) REFERENCES owner(id),
--     FOREIGN KEY(country_id) REFERENCES country(id)
-- );

-- UPDATE client SET  email_type_id = null WHERE id = 1;
-- DROP TABLE client;
-- SELECT client.*, country.country, owner.owner FROM client JOIN country JOIN owner
--             WHERE country.id =  client.country_id
--             AND owner.id =  client.owner_id
--             ORDER BY client.id LIMIT 20 OFFSET 1;


-- SELECT client.*, country.country, owner.owner, email_type.email_type
--             FROM client JOIN country JOIN owner LEFT JOIN email_type
--             WHERE country.id =  client.country_id
--             AND owner.id =  client.owner_id
--             AND (email_type.id = client.email_type_id);

SELECT client.*, country.country, owner.owner, email_type.email_type
            FROM client JOIN country ON country.id =  client.country_id
            JOIN owner ON  owner.id =  client.owner_id 
            LEFT JOIN email_type ON email_type.id = client.email_type_id ;

-- INSERT INTO email_type
--  OR (client.email_type_id IS NULL )
--     VALUES (null, null );