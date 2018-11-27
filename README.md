# Project Name

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

### Set up PostgreSQL and Create TrailPhotosDB Database

In the terminal:
1. Install PostgreSQL if you do not have it:`brew install postgresql`
2. Start PostgresSQL:`brew services start postgresql`
3. Create `trailPhotosDB`: `createdb trailPhotosDB`

#### Of Note:
+ To enter the PostgreSQL cli (db name is `trailPhotosDB`): <pre>psql <i>dbNameHere</i></pre>
+ To view all current psql databases in terminal: `psql -l`
+ To view all tables in the PostgreSQL cli: `\dt`
+ To describe table in the PostgreSQL cli:
<pre>
\d+ <i>tableNameHere</i>
</pre>
+ To view all databases in the PostgreSQL cli: `\l`
+ To exit out of the PostgreSQL cli: `\q`

### Load Generated Data Into PostgreSQL Database
+ In terminal, `npm run loadData`

### Generate New Data Into PostgreSQL Database
+ In database-postgresql/seed.js, modify the following on lines `11` and `12`:
<pre>
var numSampleTrails = <i>numberOfSampleTrailsHere-defaultIs100</i>;
var maxNumPhotosPerTrail = <i>numberOfMaxPhotosPerTrail-defaultIs5</i>;
</pre>

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

