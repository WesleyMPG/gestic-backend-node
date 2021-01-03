DROP TABLE IF EXISTS profiles;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE profiles (
  prof_id UUID DEFAULT uuid_generate_v4 (),
  prof_tag VARCHAR(200) NOT NULL UNIQUE,
  prof_name VARCHAR(200) NOT NULL,
  CONSTRAINT pk_prof PRIMARY KEY (prof_id)
);