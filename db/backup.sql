--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

--
-- Name: calculaterentalenddate(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.calculaterentalenddate() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.rental_end_date := NEW.rental_start_date + make_interval(days => NEW.rental_duration);
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.calculaterentalenddate() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id bigint NOT NULL,
    login character varying(50) NOT NULL,
    password character varying(150) NOT NULL,
    status character varying(10) DEFAULT 'user'::character varying NOT NULL,
    phone_number character varying(15) NOT NULL,
    email character varying(50),
    balance numeric(38,2) DEFAULT 0 NOT NULL,
    photo_link text
);


ALTER TABLE public.client OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.client_id_seq OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;


--
-- Name: house; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.house (
    id bigint NOT NULL,
    photo_link text,
    address character varying(150) NOT NULL,
    parking_spaces_count integer DEFAULT 0 NOT NULL,
    price_per_day numeric(8,2) NOT NULL,
    district character varying(100) NOT NULL,
    comfort_class character varying(100) NOT NULL,
    description text,
    discount_price numeric(8,2),
    map_location numeric(10,7)[] NOT NULL,
    addition_date timestamp(6) without time zone DEFAULT now(),
    last_change_date timestamp(6) without time zone
);


ALTER TABLE public.house OWNER TO postgres;

--
-- Name: rented_house; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rented_house (
    id bigint NOT NULL,
    id_house bigint NOT NULL,
    id_client bigint NOT NULL,
    rental_start_date timestamp(6) without time zone DEFAULT now() NOT NULL,
    rental_duration integer NOT NULL,
    rental_end_date timestamp(6) without time zone DEFAULT (now() + '1 day'::interval) NOT NULL,
    total_amount numeric(8,2) NOT NULL,
    CONSTRAINT rented_house_rental_duration_check CHECK (((rental_duration >= 1) AND (rental_duration <= 31)))
);


ALTER TABLE public.rented_house OWNER TO postgres;

--
-- Name: freehouse; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.freehouse AS
 SELECT id,
    photo_link,
    address,
    parking_spaces_count,
    price_per_day,
    district,
    comfort_class,
    description,
    discount_price,
    map_location,
    addition_date,
    last_change_date
   FROM public.house
  WHERE ((NOT (id IN ( SELECT rented_house.id_house
           FROM public.rented_house))) OR (id IN ( SELECT rented_house.id_house
           FROM public.rented_house
          WHERE (rented_house.rental_end_date < now()))));


ALTER VIEW public.freehouse OWNER TO postgres;

--
-- Name: house_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.house_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.house_id_seq OWNER TO postgres;

--
-- Name: house_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.house_id_seq OWNED BY public.house.id;


--
-- Name: rented_house_id_client_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rented_house_id_client_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rented_house_id_client_seq OWNER TO postgres;

--
-- Name: rented_house_id_client_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rented_house_id_client_seq OWNED BY public.rented_house.id_client;


--
-- Name: rented_house_id_house_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rented_house_id_house_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rented_house_id_house_seq OWNER TO postgres;

--
-- Name: rented_house_id_house_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rented_house_id_house_seq OWNED BY public.rented_house.id_house;


--
-- Name: rented_house_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rented_house_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rented_house_id_seq OWNER TO postgres;

--
-- Name: rented_house_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rented_house_id_seq OWNED BY public.rented_house.id;


--
-- Name: client id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- Name: house id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.house ALTER COLUMN id SET DEFAULT nextval('public.house_id_seq'::regclass);


--
-- Name: rented_house id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rented_house ALTER COLUMN id SET DEFAULT nextval('public.rented_house_id_seq'::regclass);


--
-- Name: rented_house id_house; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rented_house ALTER COLUMN id_house SET DEFAULT nextval('public.rented_house_id_house_seq'::regclass);


--
-- Name: rented_house id_client; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rented_house ALTER COLUMN id_client SET DEFAULT nextval('public.rented_house_id_client_seq'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id, login, password, status, phone_number, email, balance, photo_link) FROM stdin;
1	user1	password1	user	1234567890	user1@example.com	100.00	\N
2	user2	password2	user	2345678901	user2@example.com	200.00	\N
3	user3	password3	user	3456789012	user3@example.com	300.00	\N
\.


--
-- Data for Name: house; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.house (id, photo_link, address, parking_spaces_count, price_per_day, district, comfort_class, description, discount_price, map_location, addition_date, last_change_date) FROM stdin;
1	http://example.com/photo1.jpg	123 Main St	2	150.00	Central	Luxury	Beautiful house with a great view	\N	{40.7128000,-74.0060000}	2023-01-01 12:00:00	\N
2	http://example.com/photo2.jpg	456 Oak St	1	120.00	Suburb	Standard	Cozy home with a garden	100.00	{34.0522000,-118.2437000}	2023-02-15 14:30:00	\N
3	http://example.com/photo3.jpg	789 Pine St	0	80.00	Downtown	Economy	Compact apartment in the city center	\N	{41.8781000,-87.6298000}	2023-03-30 10:45:00	\N
\.


--
-- Data for Name: rented_house; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rented_house (id, id_house, id_client, rental_start_date, rental_duration, rental_end_date, total_amount) FROM stdin;
6	1	3	2023-12-28 22:39:16.356231	2	2023-12-30 22:39:16.356231	50000.00
\.


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_id_seq', 3, true);


--
-- Name: house_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.house_id_seq', 3, true);


--
-- Name: rented_house_id_client_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rented_house_id_client_seq', 1, false);


--
-- Name: rented_house_id_house_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rented_house_id_house_seq', 1, false);


--
-- Name: rented_house_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rented_house_id_seq', 6, true);


--
-- Name: client client_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_email_key UNIQUE (email);


--
-- Name: client client_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_login_key UNIQUE (login);


--
-- Name: client client_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_phone_number_key UNIQUE (phone_number);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: house house_address_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.house
    ADD CONSTRAINT house_address_key UNIQUE (address);


--
-- Name: house house_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.house
    ADD CONSTRAINT house_pkey PRIMARY KEY (id);


--
-- Name: rented_house rented_house_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rented_house
    ADD CONSTRAINT rented_house_pkey PRIMARY KEY (id);


--
-- Name: rented_house calculaterentalenddatetrigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER calculaterentalenddatetrigger BEFORE INSERT ON public.rented_house FOR EACH ROW EXECUTE FUNCTION public.calculaterentalenddate();


--
-- Name: rented_house fk_rentedhouse_idclient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rented_house
    ADD CONSTRAINT fk_rentedhouse_idclient FOREIGN KEY (id_client) REFERENCES public.client(id);


--
-- Name: rented_house fk_rentedhouse_idhouse; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rented_house
    ADD CONSTRAINT fk_rentedhouse_idhouse FOREIGN KEY (id_house) REFERENCES public.house(id);


--
-- PostgreSQL database dump complete
--

