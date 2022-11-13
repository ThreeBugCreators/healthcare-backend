-- schema.sql
-- Since we might run the import many times we'll drop if exists
CREATE DATABASE IF NOT EXISTS learning;

-- Make sure we're using our `blog` database
\c learning;

-- Create extension


-- We can create our user table
CREATE TABLE IF NOT EXISTS users
(
    _id uuid NOT NULL DEFAULT uuid_generate_v4(),
    username character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    surname character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (_id),
    CONSTRAINT users_username_unique UNIQUE (username)
)
