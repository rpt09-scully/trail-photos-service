# Service Name

> Trail Photos Service

## Related Projects

  - https://github.com/rpt09-scully/reviews-service
  - https://github.com/rpt09-scully/profile-service
  - https://github.com/rpt09-scully/trail-service
  - https://github.com/rpt09-scully/paths-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### Install PostgreSQL and Create TrailPhotosDB Database

In terminal:
1. Install PostgreSQL:`brew install postgresql`
2. Start PostgresSQL:`brew services start postgresql`
3. Create `trailPhotosDB`: `createdb trailPhotosDB`

#### Of Note:
+ To enter PostgreSQL cli (db name is `trailPhotosDB`): <pre>psql <i>dbNameHere</i></pre>
+ To view all current psql databases in terminal: `psql -l`
+ To view all tables in PostgreSQL cli: `\dt`
+ To describe table in PostgreSQL cli (table name is `trailphotos`):
<pre>
\d+ <i>tableNameHere</i>
</pre>
+ To view all databases in PostgreSQL cli: `\l`
+ To exit out of PostgreSQL cli: `\q`
+ `Schema` in mysql vs `Schema` in PostgreSQL can mean different things

### Set Up Environemnt Variables
1. Create a `.env` file to set up your variables: `cp .env-sample .env`
2. Open the `.env` file and fill in the `HOST`, `DATABASE`, `DBPORT` (database server port) and `PORT` (web server port) fields

### Load Generated Data Into PostgreSQL Database
+ In terminal, `npm run loadData`

### Generate New Data Into PostgreSQL Database
+ [Optional] In database-postgresql/seed.js, modify the following on lines `11` and `12`:
<pre>
var numSampleTrails = <i>numberOfSampleTrailsHere-defaultIs100</i>;
var maxNumPhotosPerTrail = <i>numberOfMaxPhotosPerTrail-defaultIs5</i>;
</pre>

### Start Server
+ To run web server, webpack watch and open index.html: `npm start`

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## Additional Resources
+ [node-postgres](https://node-postgres.com)