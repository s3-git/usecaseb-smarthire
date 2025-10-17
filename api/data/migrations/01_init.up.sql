CREATE TABLE IF NOT EXISTS users (
    id                  BIGINT                                 NOT NULL PRIMARY KEY,
    full_name           TEXT                                   NOT NULL CONSTRAINT users_full_name_check CHECK (full_name <> '' :: TEXT),
    email               TEXT                                   NOT NULL CONSTRAINT users_email_check CHECK (email <> '' :: TEXT),
    password_hashed     TEXT                                   NOT NULL CONSTRAINT users_password_hashed_check CHECK (password_hashed <> '' :: TEXT),
    phone_number        TEXT                                   NOT NULL CONSTRAINT users_phone_number_check CHECK (phone_number <> '' :: TEXT),
    role                TEXT                                   NOT NULL CONSTRAINT users_role_check CHECK (role <> '' :: TEXT),
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT users_email_index UNIQUE (email),
    CONSTRAINT users_phone_number_index UNIQUE (phone_number)
);
CREATE INDEX IF NOT EXISTS users_email_index ON users(email);
CREATE INDEX IF NOT EXISTS users_phone_number_index ON users(phone_number);
