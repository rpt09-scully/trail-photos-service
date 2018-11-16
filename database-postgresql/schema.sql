DROP DATABASE IF EXISTS trailPhotosDB;

CREATE DATABASE trailPhotosDB;

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE trailPhotos (
  photo_id SERIAL PRIMARY KEY,
  trail_url text,
  trail_id integer,
  user_id integer,
  upload_date timestamptz,
  photo_url text,
  caption text,
  is_hero_photo boolean
);