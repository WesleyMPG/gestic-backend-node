DROP TABLE IF EXISTS class_group CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE class_group (
  group_id UUID DEFAULT uuid_generate_v4 (),
  group_name VARCHAR(200) NOT NULL,
  group_code VARCHAR(200) NOT NULL UNIQUE,
  group_code_classroom VARCHAR(200),
  group_link_classroom VARCHAR (200),
  group_link_meets VARCHAR (200),
  group_link_wpp VARCHAR (200),
  group_link_tel VARCHAR (200),
  CONSTRAINT pk_group PRIMARY KEY (group_id)
);