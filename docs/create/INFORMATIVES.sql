DROP TABLE IF EXISTS informatives CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE informatives (
  info_id UUID DEFAULT uuid_generate_v4(),
  info_title VARCHAR(100) NOT NULL,
  info_content VARCHAR(1000),
  CONSTRAINT pk_info PRIMARY KEY (info_id)
);
