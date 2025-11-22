-- ⚠️ CUIDADO: isso apaga tudo do schema ipt
DROP SCHEMA IF EXISTS ipt CASCADE;

CREATE SCHEMA ipt;

-- ============================
-- ENUMS
-- ============================

CREATE TYPE ipt.sex AS ENUM (
    'Male',
    'Female'
    );

CREATE TYPE ipt.marital_status AS ENUM (
    'Single',
    'Married',
    'Widowed',
    'Divorced',
    'Cohabitation'
    );

CREATE TYPE ipt.member_classification AS ENUM (
    'Communicant',
    'NonCommunicant'
    );

CREATE TYPE ipt.member_admission_type AS ENUM (
    'Restoration',
    'TransferLetter',
    'ProfessionOfFaith',
    'JurisdictionExOficio',
    'JurisdictionByRequest',
    'BaptismAndProfessionOfFaith'
    );

CREATE TYPE ipt.member_status AS ENUM (
    'Excluded',
    'Restored',
    'Transferred',
    'UnderDiscipline',
    'InFullCommunion',
    'AbsentOrWhereaboutsUnknown'
    );

CREATE TYPE ipt.level_of_education AS ENUM (
    'Secondary',
    'Elementary',
    'Illiterate',
    'HighEducation',
    'SpecialEducation'
    );

-- ============================
-- TABELA ACCOUNTS
-- ============================

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

CREATE UNIQUE INDEX accounts_cpf_uk ON ipt.accounts (cpf);
CREATE UNIQUE INDEX accounts_email_uk ON ipt.accounts (email);

-- ============================
-- TABELA MEMBERS
-- ============================

CREATE TABLE ipt.members
(
    member_id                uuid PRIMARY KEY,
    cpf                      text                     NOT NULL,
    email                    text                     NOT NULL,
    phone                    text,

    sex                      ipt.sex                  NOT NULL,
    status                   ipt.member_status        NOT NULL,

    full_name                text                     NOT NULL,
    birthdate                date                     NOT NULL,
    celebrant                text,
    place_of_birth           text,
    marital_status           ipt.marital_status,
    admission_type           ipt.member_admission_type,
    classification           ipt.member_classification,
    level_of_education       ipt.level_of_education,
    religious_background     text,
    was_baptized_in_infancy  boolean,
    profession_of_faith_date date,

    created_at               timestamp                NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX members_cpf_uk ON ipt.members (cpf);
CREATE UNIQUE INDEX members_email_uk ON ipt.members (email);

-- ============================
-- TABELA MEMBERS_ADDRESSES
-- ============================

CREATE TABLE ipt.members_addresses
(
    member_id   uuid        PRIMARY KEY,
    city        text        NOT NULL,
    state       text        NOT NULL,
    street      text        NOT NULL,
    number      text        NOT NULL,
    zip_code    text        NOT NULL,
    district    text        NOT NULL,
    complement  text,

    CONSTRAINT fk_members_addresses_member
        FOREIGN KEY (member_id)
            REFERENCES ipt.members (member_id)
            ON DELETE CASCADE
);
