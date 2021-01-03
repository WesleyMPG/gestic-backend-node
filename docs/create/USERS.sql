DROP TABLE IF EXISTS users;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  user_id UUID DEFAULT uuid_generate_v4 (),
  prod_id UUID NOT NULL,
  user_name VARCHAR(200) NOT NULL,
  user_cpf VARCHAR(15) NOT NULL UNIQUE,
  user_email VARCHAR(200) NOT NULL UNIQUE,
  user_password VARCHAR(200) NOT NULL,
  CONSTRAINT pk_user PRIMARY KEY (user_id),
  CONSTRAINT fk_user_prof FOREIGN KEY (prod_id) REFERENCES profiles (prof_id) ON DELETE CASCADE
);