DROP SCHEMA IF EXISTS ipt CASCADE;

CREATE SCHEMA ipt;

CREATE TABLE ipt.accounts
(
    account_id uuid PRIMARY KEY,
    cpf        text      NOT NULL,
    email      text      NOT NULL,
    password   text      NOT NULL,
    last_name  text      NOT NULL,
    first_name text      NOT NULL,
    created_at timestamp NOT NULL DEFAULT now()
);