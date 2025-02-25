--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2025-01-25 18:40:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public."appeals" (
    id integer NOT NULL,
    appeal_status character varying(255) NOT NULL,
    topic character varying(255) NOT NULL,
    appeal_text character varying(255) NOT NULL,
    reject_reason character varying(255),
    resolve_text character varying(255),
    "createdAt" timestamp NOT NULL,
    "updatedAt" timestamp NOT NULL
);

ALTER TABLE public."appeals" OWNER TO postgres;

CREATE SEQUENCE public."appeals_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."appeals_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."appeals_id_seq" OWNED BY public."appeals".id;

ALTER TABLE ONLY public."appeals" ALTER COLUMN id SET DEFAULT nextval('public."appeals_id_seq"'::regclass);

ALTER TABLE ONLY public."appeals"
    ADD CONSTRAINT "appeals_pkey" PRIMARY KEY (id);