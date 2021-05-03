DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS offer CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS file CASCADE;
DROP TABLE IF EXISTS informatives CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE profiles (
  prof_id UUID DEFAULT uuid_generate_v4 (),
  prof_tag VARCHAR(200) NOT NULL UNIQUE,
  prof_name VARCHAR(200) NOT NULL,
  CONSTRAINT pk_prof PRIMARY KEY (prof_id)
);


CREATE TABLE users (
  user_id UUID DEFAULT uuid_generate_v4 (),
  prof_id UUID NOT NULL,
  user_name VARCHAR(200) NOT NULL,
  user_email VARCHAR(200) NOT NULL UNIQUE,
  user_password VARCHAR(200) NOT NULL,
  user_status BOOLEAN NOT NULL,
  CONSTRAINT pk_user PRIMARY KEY (user_id),
  CONSTRAINT fk_user_prof FOREIGN KEY (prof_id) REFERENCES profiles (prof_id) ON DELETE CASCADE
);


CREATE TABLE offer (
  offer_id UUID DEFAULT uuid_generate_v4 (),
  offer_name VARCHAR(200) NOT NULL,
  offer_code VARCHAR(200) NOT NULL UNIQUE,
  offer_code_classroom VARCHAR(200),
  offer_link_classroom VARCHAR (200),
  offer_link_meets VARCHAR (200),
  offer_link_wpp VARCHAR (200),
  offer_link_tel VARCHAR (200),
  CONSTRAINT pk_offer PRIMARY KEY (offer_id)
);


CREATE TABLE project (
  proj_id UUID DEFAULT uuid_generate_v4 (),
  proj_name VARCHAR(200) NOT NULL UNIQUE,
  proj_user UUID NOT NULL,
  proj_description VARCHAR(200) NOT NULL,
  CONSTRAINT pk_proj PRIMARY KEY (proj_id),
  CONSTRAINT fk_proj_user FOREIGN KEY (proj_user) REFERENCES users (user_id) ON DELETE CASCADE
);


CREATE TABLE file (
  file_id UUID DEFAULT uuid_generate_v4 (),
  file_tag VARCHAR(200) NOT NULL,
  file_name VARCHAR(200) NOT NULL,
  file_ref VARCHAR(200) NOT NULL UNIQUE,
  CONSTRAINT pk_file PRIMARY KEY (file_id)
);


CREATE TABLE informatives (
  info_id UUID DEFAULT uuid_generate_v4(),
  info_title VARCHAR(100) NOT NULL,
  info_content VARCHAR(1000),
  CONSTRAINT pk_info PRIMARY KEY (info_id)
);
