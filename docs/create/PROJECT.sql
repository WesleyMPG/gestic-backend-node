DROP TABLE IF EXISTS project CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE project (
  proj_id UUID DEFAULT uuid_generate_v4 (),
  proj_name VARCHAR(200) NOT NULL UNIQUE,
  proj_user UUID NOT NULL,
  proj_description VARCHAR(200) NOT NULL,
  CONSTRAINT pk_proj PRIMARY KEY (proj_id),
  CONSTRAINT fk_proj_user FOREIGN KEY (proj_user) REFERENCES users (user_id) ON DELETE CASCADE
);