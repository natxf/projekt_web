-- Table: public.missing_people

-- DROP TABLE IF EXISTS public.missing_people;

CREATE TABLE IF NOT EXISTS public.missing_people
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    surname character varying(100) COLLATE pg_catalog."default" NOT NULL,
    voiv character varying(100) COLLATE pg_catalog."default" NOT NULL,
    m_year integer NOT NULL,
    b_year integer NOT NULL,
    sex character varying(10) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT missing_people_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.missing_people
    OWNER to postgres;

-- Inserting sample data into missing_people
INSERT INTO public.missing_people (name, surname, voiv, m_year, b_year, sex, description)
VALUES
    ('Anna', 'Kowalska', 'Mazowieckie', 2024, 1994, 'Kobieta', 'Zaginęła w 2024 roku, ostatni raz widziana w Warszawie.'),
    ('Jan', 'Nowak', 'Lubuskie', 2023, 1991, 'Mężczyzna', 'Zaginął podczas wyprawy w Lubuskim.'),
    ('Katarzyna', 'Wójcik', 'Lubelskie', 2022, 2000, 'Kobieta', 'Ostatni raz widziana w Lublinie, brak dalszych informacji.'),
    ('Michał', 'Lewandowski', 'Pomorskie', 2021, 1985, 'Mężczyzna', 'Zaginął po wypadku łodziowym w województwie Pomorskim.'),
    ('Ewa', 'Zielińska', 'Dolnośląskie', 2023, 1995, 'Kobieta', 'Ostatni raz widziana na dworcu kolejowym we Wrocławiu, brak kontaktu.'),
    ('Piotr', 'Szymański', 'Wielkopolskie', 2024, 1990, 'Mężczyzna', 'Zaginął w tajemniczych okolicznościach w Poznaniu.');

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

-- Table: public.user_missing_people

-- DROP TABLE IF EXISTS public.user_missing_people;

CREATE TABLE IF NOT EXISTS public.user_missing_people
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    missing_person_id uuid NOT NULL,
    CONSTRAINT user_missing_people_pkey PRIMARY KEY (id),
    CONSTRAINT user_missing_people_missing_person_id_fkey FOREIGN KEY (missing_person_id)
        REFERENCES public.missing_people (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT user_missing_people_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.user_missing_people
    OWNER to postgres;
