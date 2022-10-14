--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

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

--
-- Name: block_list_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.block_list_entity (
    index integer NOT NULL,
    "fromUid" integer NOT NULL,
    "toUid" integer NOT NULL
);


ALTER TABLE public.block_list_entity OWNER TO postgres;

--
-- Name: block_list_entity_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.block_list_entity_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.block_list_entity_index_seq OWNER TO postgres;

--
-- Name: block_list_entity_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.block_list_entity_index_seq OWNED BY public.block_list_entity.index;


--
-- Name: channel_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.channel_entity (
    chid integer NOT NULL,
    "chName" character varying NOT NULL,
    "chOwnerId" integer NOT NULL,
    mode integer DEFAULT 0 NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.channel_entity OWNER TO postgres;

--
-- Name: channel_entity_chid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.channel_entity_chid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channel_entity_chid_seq OWNER TO postgres;

--
-- Name: channel_entity_chid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.channel_entity_chid_seq OWNED BY public.channel_entity.chid;


--
-- Name: dm_log_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dm_log_entity (
    index integer NOT NULL,
    "time" timestamp with time zone NOT NULL,
    content character varying NOT NULL,
    "fromUid" integer,
    "toUid" integer
);


ALTER TABLE public.dm_log_entity OWNER TO postgres;

--
-- Name: dm_log_entity_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dm_log_entity_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dm_log_entity_index_seq OWNER TO postgres;

--
-- Name: dm_log_entity_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dm_log_entity_index_seq OWNED BY public.dm_log_entity.index;


--
-- Name: friend_list_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friend_list_entity (
    index integer NOT NULL,
    "fromUid" integer NOT NULL,
    "toUid" integer NOT NULL
);


ALTER TABLE public.friend_list_entity OWNER TO postgres;

--
-- Name: friend_list_entity_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.friend_list_entity_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.friend_list_entity_index_seq OWNER TO postgres;

--
-- Name: friend_list_entity_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.friend_list_entity_index_seq OWNED BY public.friend_list_entity.index;


--
-- Name: match_history_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.match_history_entity (
    index integer NOT NULL,
    "isRank" boolean NOT NULL,
    "winnerUid" integer NOT NULL,
    "loserUid" integer NOT NULL
);


ALTER TABLE public.match_history_entity OWNER TO postgres;

--
-- Name: match_history_entity_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.match_history_entity_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.match_history_entity_index_seq OWNER TO postgres;

--
-- Name: match_history_entity_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.match_history_entity_index_seq OWNED BY public.match_history_entity.index;


--
-- Name: user_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_entity (
    uid integer NOT NULL,
    "displayName" character varying NOT NULL,
    "imgUri" character varying NOT NULL,
    rating integer NOT NULL,
    "mfaNeed" boolean DEFAULT false NOT NULL,
    "qrSecret" character varying NOT NULL,
    status integer NOT NULL,
    "gameRoom" character varying
);


ALTER TABLE public.user_entity OWNER TO postgres;

--
-- Name: user_in_channel_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_in_channel_entity (
    index integer NOT NULL,
    uid integer NOT NULL,
    chid integer NOT NULL,
    "userRole" integer NOT NULL,
    "isMute" boolean DEFAULT false NOT NULL,
    "isBan" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.user_in_channel_entity OWNER TO postgres;

--
-- Name: user_in_channel_entity_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_in_channel_entity_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_in_channel_entity_index_seq OWNER TO postgres;

--
-- Name: user_in_channel_entity_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_in_channel_entity_index_seq OWNED BY public.user_in_channel_entity.index;


--
-- Name: block_list_entity index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.block_list_entity ALTER COLUMN index SET DEFAULT nextval('public.block_list_entity_index_seq'::regclass);


--
-- Name: channel_entity chid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_entity ALTER COLUMN chid SET DEFAULT nextval('public.channel_entity_chid_seq'::regclass);


--
-- Name: dm_log_entity index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_log_entity ALTER COLUMN index SET DEFAULT nextval('public.dm_log_entity_index_seq'::regclass);


--
-- Name: friend_list_entity index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend_list_entity ALTER COLUMN index SET DEFAULT nextval('public.friend_list_entity_index_seq'::regclass);


--
-- Name: match_history_entity index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_history_entity ALTER COLUMN index SET DEFAULT nextval('public.match_history_entity_index_seq'::regclass);


--
-- Name: user_in_channel_entity index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_in_channel_entity ALTER COLUMN index SET DEFAULT nextval('public.user_in_channel_entity_index_seq'::regclass);


--
-- Data for Name: block_list_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.block_list_entity (index, "fromUid", "toUid") FROM stdin;
\.


--
-- Data for Name: channel_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.channel_entity (chid, "chName", "chOwnerId", mode, password) FROM stdin;
1	dm85355	85355	3	
2	dm81730	81730	3	
3	dm99857	99857	3	
4	dm1	1	3	
5	dm2	2	3	
6	dm3	3	3	
7	dm4	4	3	
8	42GunGonGamLeeLee	1	0	
9	42GunGonGamLeeLee1	1	0	
10	42GunGonGamLeeLee2	2	0	
11	42GunGonGamLeeLee3	3	0	
12	protected1	1	1	1234
13	protected2	2	1	1234
14	protected3	3	1	1234
15	private1	1	2	
16	private2	2	2	
17	dm99947	99947	3	
\.


--
-- Data for Name: dm_log_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dm_log_entity (index, "time", content, "fromUid", "toUid") FROM stdin;
\.


--
-- Data for Name: friend_list_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.friend_list_entity (index, "fromUid", "toUid") FROM stdin;
\.


--
-- Data for Name: match_history_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.match_history_entity (index, "isRank", "winnerUid", "loserUid") FROM stdin;
\.


--
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_entity (uid, "displayName", "imgUri", rating, "mfaNeed", "qrSecret", status, "gameRoom") FROM stdin;
85355	s2x3m83f9	http://localhost:4243/img/85355.png	42	f	JVGQGCRBIAMDKIBL	0	
81730	1sdwdwuwv	http://localhost:4243/img/81730.png	42	f	PVFWCRIBHNHTWNZ6	0	
99857	6g635chah	http://localhost:4243/img/99857.png	42	f	GALREZZVPRNECPQA	0	
1	dummy1	http://localhost:4243/img/99857.png	0	f	string	0	
2	dummy2	http://localhost:4243/img/99857.png	0	f	string	0	
3	dummy3	http://localhost:4243/img/99857.png	1000	f	string	0	
4	dummy4	http://localhost:4243/img/99857.png	200	f	string	0	
99947	jaham	http://localhost:4243/img/81730.png	200	f	string	0	
\.


--
-- Data for Name: user_in_channel_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_in_channel_entity (index, uid, chid, "userRole", "isMute", "isBan") FROM stdin;
1	1	8	0	f	f
2	1	9	0	f	f
3	2	10	0	f	f
4	3	11	0	f	f
5	1	12	0	f	f
6	2	13	0	f	f
7	3	14	0	f	f
8	1	15	0	f	f
9	2	16	0	f	f
10	99947	8	2	f	f
11	99947	9	2	f	f
12	99947	10	2	f	f
13	99947	11	2	f	f
14	99947	12	2	f	f
15	99947	13	2	f	f
16	99947	14	2	f	f
17	99947	15	2	f	f
18	99947	16	2	f	f
19	99947	17	2	f	f
20	99947	3	2	f	f
21	99947	1	2	f	f
\.


--
-- Name: block_list_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.block_list_entity_index_seq', 1, false);


--
-- Name: channel_entity_chid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.channel_entity_chid_seq', 17, true);


--
-- Name: dm_log_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dm_log_entity_index_seq', 1, false);


--
-- Name: friend_list_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.friend_list_entity_index_seq', 1, false);


--
-- Name: match_history_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.match_history_entity_index_seq', 1, false);


--
-- Name: user_in_channel_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_in_channel_entity_index_seq', 21, true);


--
-- Name: dm_log_entity PK_3cd8586412852809c432ef05203; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_log_entity
    ADD CONSTRAINT "PK_3cd8586412852809c432ef05203" PRIMARY KEY (index);


--
-- Name: friend_list_entity PK_5bbcfdaf98fb1263a0a98953e03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend_list_entity
    ADD CONSTRAINT "PK_5bbcfdaf98fb1263a0a98953e03" PRIMARY KEY (index);


--
-- Name: user_entity PK_a161dd1eddd0a7147ed632e23c0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "PK_a161dd1eddd0a7147ed632e23c0" PRIMARY KEY (uid);


--
-- Name: block_list_entity PK_a580051d53bc19215e20b48787e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.block_list_entity
    ADD CONSTRAINT "PK_a580051d53bc19215e20b48787e" PRIMARY KEY (index);


--
-- Name: user_in_channel_entity PK_ab2dff8d451009750ee99db314e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_in_channel_entity
    ADD CONSTRAINT "PK_ab2dff8d451009750ee99db314e" PRIMARY KEY (index);


--
-- Name: match_history_entity PK_b273fba44f0bb1aa6ca6e8c73a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_history_entity
    ADD CONSTRAINT "PK_b273fba44f0bb1aa6ca6e8c73a4" PRIMARY KEY (index);


--
-- Name: channel_entity PK_bfb1c3cf3eb07a445bfc50f90e2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_entity
    ADD CONSTRAINT "PK_bfb1c3cf3eb07a445bfc50f90e2" PRIMARY KEY (chid);


--
-- Name: friend_list_entity UQ_c0c82e4ea6d870fb6110755beba; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend_list_entity
    ADD CONSTRAINT "UQ_c0c82e4ea6d870fb6110755beba" UNIQUE ("fromUid", "toUid");


--
-- Name: block_list_entity UQ_c69d55c196a741d23db8db95c40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.block_list_entity
    ADD CONSTRAINT "UQ_c69d55c196a741d23db8db95c40" UNIQUE ("fromUid", "toUid");


--
-- Name: user_in_channel_entity UQ_c723eb9c5ee42842ebae768811c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_in_channel_entity
    ADD CONSTRAINT "UQ_c723eb9c5ee42842ebae768811c" UNIQUE (uid, chid);


--
-- Name: user_entity UQ_f79f8878e405a36538c964bef5d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "UQ_f79f8878e405a36538c964bef5d" UNIQUE ("displayName");


--
-- Name: dm_log_entity FK_0fce4ee3fb288ff6f77d356f3d9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_log_entity
    ADD CONSTRAINT "FK_0fce4ee3fb288ff6f77d356f3d9" FOREIGN KEY ("fromUid") REFERENCES public.user_entity(uid);


--
-- Name: user_in_channel_entity FK_21e0fd1481f7504c737140b2a0e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_in_channel_entity
    ADD CONSTRAINT "FK_21e0fd1481f7504c737140b2a0e" FOREIGN KEY (chid) REFERENCES public.channel_entity(chid);


--
-- Name: match_history_entity FK_257245eed59d6c1dadf9fccffc3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_history_entity
    ADD CONSTRAINT "FK_257245eed59d6c1dadf9fccffc3" FOREIGN KEY ("loserUid") REFERENCES public.user_entity(uid);


--
-- Name: channel_entity FK_31c85facd97b3a58ff63b57e2ff; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_entity
    ADD CONSTRAINT "FK_31c85facd97b3a58ff63b57e2ff" FOREIGN KEY ("chOwnerId") REFERENCES public.user_entity(uid);


--
-- Name: friend_list_entity FK_60c759f696ab04d933be25e062f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend_list_entity
    ADD CONSTRAINT "FK_60c759f696ab04d933be25e062f" FOREIGN KEY ("toUid") REFERENCES public.user_entity(uid);


--
-- Name: match_history_entity FK_78057088d054b99b6cabc852639; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.match_history_entity
    ADD CONSTRAINT "FK_78057088d054b99b6cabc852639" FOREIGN KEY ("winnerUid") REFERENCES public.user_entity(uid);


--
-- Name: block_list_entity FK_c9bf48073c4b32636d65b561491; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.block_list_entity
    ADD CONSTRAINT "FK_c9bf48073c4b32636d65b561491" FOREIGN KEY ("toUid") REFERENCES public.user_entity(uid);


--
-- Name: dm_log_entity FK_ee268200e078434d5ca2ee23e42; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dm_log_entity
    ADD CONSTRAINT "FK_ee268200e078434d5ca2ee23e42" FOREIGN KEY ("toUid") REFERENCES public.user_entity(uid);


--
-- Name: user_in_channel_entity FK_ef9d2896c495d46680b90589bf8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_in_channel_entity
    ADD CONSTRAINT "FK_ef9d2896c495d46680b90589bf8" FOREIGN KEY (uid) REFERENCES public.user_entity(uid);


--
-- PostgreSQL database dump complete
--

