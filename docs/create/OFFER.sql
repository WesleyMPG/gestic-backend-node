DROP TABLE IF EXISTS offer CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
