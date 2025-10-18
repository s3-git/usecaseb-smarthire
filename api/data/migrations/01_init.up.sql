--  TABLE: users
CREATE TABLE IF NOT EXISTS users (
    id                  BIGINT                                 NOT NULL PRIMARY KEY,
    full_name           TEXT                                   NOT NULL CONSTRAINT users_full_name_check CHECK (full_name <> '' :: TEXT),
    email               TEXT                                   NOT NULL CONSTRAINT users_email_check CHECK (email <> '' :: TEXT),
    password_hashed     TEXT                                   NOT NULL CONSTRAINT users_password_hashed_check CHECK (password_hashed <> '' :: TEXT),
    phone_number        TEXT                                   NOT NULL CONSTRAINT users_phone_number_check CHECK (phone_number <> '' :: TEXT),
    user_role           TEXT                                   NOT NULL CONSTRAINT users_role_check CHECK (user_role <> '' :: TEXT),
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT users_email_index UNIQUE (email),
    CONSTRAINT users_phone_number_index UNIQUE (phone_number)
);
CREATE INDEX IF NOT EXISTS users_email_index ON users(email);
CREATE INDEX IF NOT EXISTS users_phone_number_index ON users(phone_number);

--  TABLE: candidates
CREATE TABLE IF NOT EXISTS candidates (
    id                BIGINT PRIMARY KEY,
    user_id           BIGINT NOT NULL REFERENCES users(id) UNIQUE,
    headline          TEXT NOT NULL default ''::TEXT,
    summary           TEXT NOT NULL default ''::TEXT,
    years_experience  SMALLINT NOT NULL DEFAULT 0,
    location          TEXT NOT NULL default ''::TEXT,
    cv_url            TEXT NOT NULL default ''::TEXT,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS candidates_user_id_index ON candidates(user_id);

--  TABLE: jobs
CREATE TABLE IF NOT EXISTS jobs (
    id                  BIGINT PRIMARY KEY,
    job_title           TEXT NOT NULL CONSTRAINT jobs_job_title_check CHECK (job_title <> ''::TEXT),
    posting_status      TEXT NOT NULL CONSTRAINT jobs_posting_status_check CHECK (posting_status IN ('draft','posted','expired')),
    level               INT NOT NULL DEFAULT 0,
    overview            TEXT NOT NULL DEFAULT ''::TEXT,
    department          TEXT NOT NULL DEFAULT ''::TEXT,
    minimum_fit_score   SMALLINT NOT NULL DEFAULT 0 CHECK (minimum_fit_score >= 0 AND minimum_fit_score <= 100),
    assignee_user_id    BIGINT REFERENCES users(id),
    posted_date         TIMESTAMPTZ,
    start_date          TIMESTAMPTZ,
    end_date            TIMESTAMPTZ,
    is_auto_post        BOOLEAN NOT NULL DEFAULT FALSE,
    job_posting_note    TEXT NOT NULL DEFAULT ''::TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS jobs_posting_status_index ON jobs(posting_status);
CREATE INDEX IF NOT EXISTS jobs_department_index ON jobs(department);
CREATE INDEX IF NOT EXISTS jobs_assignee_index ON jobs(assignee_user_id);

--  TABLE: job_applications
CREATE TABLE IF NOT EXISTS job_applications (
    id                         BIGINT PRIMARY KEY,
    candidate_id               BIGINT NOT NULL REFERENCES candidates(id),
    job_id                     BIGINT NOT NULL REFERENCES jobs(id),
    title                      TEXT NOT NULL CONSTRAINT job_applications_title_check CHECK (title <> ''::TEXT),
    description                TEXT NOT NULL CONSTRAINT job_applications_description_check CHECK (description <> ''::TEXT),
    status                     TEXT NOT NULL CONSTRAINT job_applications_status_check CHECK (status <> ''::TEXT),
    source_type                TEXT CONSTRAINT job_applications_source_type_check CHECK (source_type <> ''::TEXT),
    pipeline_stage             TEXT NOT NULL CONSTRAINT job_applications_pipeline_stage_check CHECK (pipeline_stage <> ''::TEXT),
    interview_scheduled_time   TIMESTAMPTZ,
    candidate_feedback         TEXT,
    ai_ranking_scores          NUMERIC(5,2),
    created_at                 TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                 TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT job_applications_candidate_job_unique UNIQUE (candidate_id, job_id)
);
CREATE INDEX IF NOT EXISTS job_applications_status_index ON job_applications(status);
CREATE INDEX IF NOT EXISTS job_applications_job_stage_index ON job_applications(job_id, pipeline_stage);

--  TABLE: upload_files
CREATE TABLE IF NOT EXISTS upload_files (
    id             BIGINT PRIMARY KEY,
    candidate_id   BIGINT NOT NULL REFERENCES candidates(id),
    file_url       TEXT NOT NULL CONSTRAINT upload_files_file_url_check CHECK (file_url <> ''::TEXT),
    status         TEXT NOT NULL CONSTRAINT upload_files_status_check CHECK (status <> ''::TEXT),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS upload_files_candidate_index ON upload_files(candidate_id);

--  TABLE: alerts
CREATE TABLE IF NOT EXISTS alerts (
    id          BIGINT PRIMARY KEY,
    candidate_id  BIGINT NOT NULL REFERENCES candidates(id),
    title       TEXT NOT NULL CONSTRAINT alerts_title_check CHECK (title <> ''::TEXT),
    body        TEXT NOT NULL CONSTRAINT alerts_body_check CHECK (body <> ''::TEXT),
    type        TEXT NOT NULL CONSTRAINT alerts_type_check CHECK (type <> ''::TEXT),
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS alerts_candidate_read_index ON alerts(candidate_id, is_read);
CREATE INDEX IF NOT EXISTS alerts_created_index ON alerts(created_at);

--  TABLE: chat_conversations
CREATE TABLE IF NOT EXISTS chat_conversations (
    id                   BIGINT PRIMARY KEY,
    applicant_user_id    BIGINT NOT NULL REFERENCES users(id),
    ta_user_id           BIGINT NOT NULL REFERENCES users(id),
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chat_conversations_pair_unique UNIQUE (applicant_user_id, ta_user_id)
);
CREATE INDEX IF NOT EXISTS chat_conversations_pair_index ON chat_conversations(applicant_user_id, ta_user_id);

--  TABLE: chat_messages
CREATE TABLE IF NOT EXISTS chat_messages (
    id                BIGINT PRIMARY KEY,
    conversation_id   BIGINT NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
    sender_user_id    BIGINT NOT NULL REFERENCES users(id),
    body              TEXT NOT NULL CONSTRAINT chat_messages_body_check CHECK (body <> ''::TEXT),
    sent_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS chat_messages_conv_time_index ON chat_messages(conversation_id, sent_at, id);
