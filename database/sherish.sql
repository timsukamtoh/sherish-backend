\echo 'Delete and recreate sherish db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sherish;
CREATE DATABASE sherish;
\connect sherish

\i sherish-schema.sql
\i sherish-seed.sql

\echo 'Delete and recreate sherish_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE sherish_test;
CREATE DATABASE sherish_test;
\connect sherish_test

\i sherish-schema.sql
