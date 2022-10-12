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
    display boolean DEFAULT true NOT NULL,
    "isLocked" boolean DEFAULT false NOT NULL,
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
    status integer NOT NULL
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
1	99857	0
2	99857	1
3	99857	2
4	99857	3
5	99857	5
6	0	5
7	1	4
8	99947	0
9	99947	3
10	99947	5
11	112230	5
12	112230	4
13	112230	6
\.


--
-- Data for Name: channel_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.channel_entity (chid, "chName", "chOwnerId", display, "isLocked", password) FROM stdin;
2	보컬 회의	4	t	t	01234
3	효제킴의 깃 강의	85355	t	f	
4	찬파의 알고리즘 - 찬파해버렸다!	99909	t	f	
5	예주의 42 인싸 비결 공개	81730	t	t	1234
6	자함의 트센열차	99947	t	f	
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
1	81730	0
2	81730	1
4	81730	2
5	81730	3
6	81730	4
7	81730	5
8	81730	99857
9	81730	85355
10	99857	0
11	2	0
12	3	5
15	81730	99909
16	81730	99947
17	99947	0
18	99947	1
19	99947	2
20	99947	3
21	99947	4
22	99947	5
23	99947	6
24	99947	99909
25	99947	81730
26	99947	85355
27	99947	99857
28	112230	99857
29	112230	81730
30	112230	0
31	112230	1
32	112230	2
33	112230	3
34	112230	4
35	112230	5
36	112230	6
37	112230	85355
\.


--
-- Data for Name: match_history_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.match_history_entity (index, "isRank", "winnerUid", "loserUid") FROM stdin;
1	t	0	1
2	t	1	0
3	t	99909	0
4	t	99909	1
5	t	99909	2
6	t	99909	3
7	t	99909	4
8	t	99909	5
9	t	99909	85355
10	t	99909	81730
11	t	99909	112230
12	f	112230	99909
13	f	112230	99857
14	f	112230	85355
15	f	112230	2
16	f	3	2
17	f	5	2
18	t	81730	0
19	t	81730	2
20	f	81730	99909
21	f	81730	85355
22	f	81730	3
23	f	81730	1
\.


--
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_entity (uid, "displayName", "imgUri", rating, "mfaNeed", "qrSecret", status) FROM stdin;
81730	yeju	http://backend/users/img/default_img	42	f	KAHBK63XHN6SYMJV	0
99857	mypark	http://backend/users/img/default_img	42	f	PZSQCFRPDERRSMIZ	0
85355	hyojekim	http://backend/users/img/default_img	42	t	OQ2XQJSDKMFS2A2B	0
0	dummy0	http://backend/users/img/default_img	0	f	string	0
1	dummy1	http://backend/users/img/default_img	2000	f	string	0
2	dummy2	http://backend/users/img/default_img	200	f	string	0
3	dummy3	http://backend/users/img/default_img	20000	f	string	0
4	dummy4	http://backend/users/img/default_img	200	f	string	0
5	dummy5	http://backend/users/img/default_img	4242	f	string	0
99947	jaham	http://backend/users/img/default_img	42	f	O4TX43QVPVNFQOSP	0
6	dummy6	http://backend/users/img/default_img	2020	f	string	0
99909	chanhpar	http://backend/users/img/default_img	42	f	LZHV6YQHNVTVA4RW	0
112230	9ey7a3gdu	http://backend/users/img/default_img	42	f	M5NA6HJHAMXQKQIH	0
\.


--
-- Data for Name: user_in_channel_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_in_channel_entity (index, uid, chid, "userRole", "isMute", "isBan") FROM stdin;
2	4	2	0	f	f
3	85355	3	0	f	f
4	99909	4	0	f	f
5	81730	5	0	f	f
6	99947	6	0	f	f
7	0	2	2	f	f
8	1	2	2	f	f
9	2	2	2	f	f
10	3	2	2	f	f
12	5	2	2	f	f
13	6	2	2	f	f
14	99857	4	2	f	f
16	85355	4	2	f	f
17	112230	6	2	f	f
18	81730	6	2	f	f
19	99857	6	2	f	f
20	85355	6	2	f	f
\.


--
-- Name: block_list_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.block_list_entity_index_seq', 13, true);


--
-- Name: channel_entity_chid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.channel_entity_chid_seq', 6, true);


--
-- Name: dm_log_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dm_log_entity_index_seq', 1, false);


--
-- Name: friend_list_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.friend_list_entity_index_seq', 37, true);


--
-- Name: match_history_entity_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.match_history_entity_index_seq', 23, true);


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

