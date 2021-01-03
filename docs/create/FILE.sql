DROP TABLE IF EXISTS file;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE file (
  file_id UUID DEFAULT uuid_generate_v4 (),
  file_tag VARCHAR(200) NOT NULL,
  file_name VARCHAR(200) NOT NULL,
  file_ref VARCHAR(200) NOT NULL UNIQUE,
  CONSTRAINT PK_file PRIMARY KEY (file_id)
);