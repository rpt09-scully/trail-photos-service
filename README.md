# Trail Photos Service

## Related Projects

  - https://github.com/rpt09-scully/reviews-service
  - https://github.com/rpt09-scully/profile-service
  - https://github.com/rpt09-scully/trail-service
  - https://github.com/rpt09-scully/paths-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Additional Resources](#additional-resources)

## Usage
### API Endpoints
+ GET `/:trailId/photos?sortBy={asc|desc}`
  - Given a trailId, retrieves photos affiliated with the respective trailId
+ GET `/:trailId/photoCount`
  - Given a trailId, retrieves total count of photos affiliated with the respective trailId
+ GET `/:trailId/heroPhoto`
  - Given a trailId, retrieves hero photo affiliated with respective the trailId

#### Of Note:
+ All data returns in .json format.
+ .json shape loosely follows the [{json:api}](https://jsonapi.org/) standard.
+ Reference exact shapes of returned data [here](example-data/).

### Setting Up

#### Install PostgreSQL and Create TrailPhotosDB Database

In terminal:
1. Install PostgreSQL:`brew install postgresql` (this example uses PostgreSQL version 10.5)
2. Start PostgresSQL:`brew services start postgresql`
3. Create `trailPhotosDB`: `createdb trailPhotosDB`

##### Of Note:
+ To enter PostgreSQL cli (db name is `trailPhotosDB`): <pre>psql <i>dbNameHere</i></pre>
+ To view all current psql databases in terminal: `psql -l`
+ To view all tables in PostgreSQL cli: `\dt`
+ To describe table in PostgreSQL cli (table name is `trailphotos`):
<pre>
\d+ <i>tableNameHere</i>
</pre>
+ To view all databases in PostgreSQL cli: `\l`
+ To exit out of PostgreSQL cli: `\q`
+ If neccessary, to grant a specific user permissions to the table, log into psql as a super user and in the PostgreSQL cli (table name is `trailphotos`):
<pre>
GRANT ALL PRIVILEGES ON TABLE <i>tableNameHere</i> TO <i>userNameHere</i>
GRANT USAGE ON SCHEMA public TO <i>userNameHere</i>
</pre>
+ `Schema` in mysql vs `Schema` in PostgreSQL can mean different things

#### Set Up Environment Variables
1. Create a `.env` file to set up your variables: `cp .env-sample .env`
2. Open the `.env` file and fill in the `HOST`, `DBUSERNAME`, `DBPASSWORD` and `DBPORT` (database server port) fields (default `DBPORT` is `5432`)

#### Load Generated Data Into PostgreSQL Database
+ In terminal, `npm run loadData`

#### [Optional] Generate New Data Into PostgreSQL Database
+ In [database-postgresql/seed.js](database-postgresql/seed.js), modify the following on lines `11` through `13`:
<pre>
var numSampleTrails = <i>numberOfSampleTrailsHere-defaultIs100</i>;
var maxNumPhotosPerTrail = <i>numberOfMaxPhotosPerTrail-defaultIs50</i>;
var minNumPhotosPerTrail = <i>numberOfMaxPhotosPerTrail-defaultIs30</i>;
</pre>
##### Of Note:
To truly generate consecutive random photos from [unsplash](https://source.unsplash.com/), a timeout of 2800 ms has been placed on line `28` through line `30` of [database-postgresql/seed.js](database-postgresql/seed.js).  As such, if you find generating new data takes too long, feel free to adjust the variable values indicated above (`numSampleTrails`, `maxNumPhotosPerTrail`, `minNumPhotosPerTrail`).

#### Start Server
+ To run the web server and open index.html: `npm start`
+ To run the web server, webpack watch and open index.html: `npm start-dev`

#### Run Tests
+ To run all tests: `npm test`
+ [Advanced Only] To update test snapshots: `npm testUpdate`
##### Of Note:
+ I learned that to `unmock` a manually mocked module, you must accompany `jest.unmock()` with `require.requireActual()`.  See below for an example  (`actual module path` should be `../database-postgresql/connection`).
<pre>
jest.unmock('<i>insertActualModulePath</i>');
let client = require.requireActual('<i>insertActualModulePath</i>');
</pre>

+ An alternative to having an adjacent `__mocks__` directory with mock files, I could have inserted my mock functions inline with `.mockImplementation`:
<pre>
jest.mock('<i>insertActualModulePath</i>');
client.query.mockImplementation((PSQLStatement, [trailId], callback) => {
  callback('error', null);
});
</pre>

## Error Handling

Error paths explicitly logged and handled where node will terminate:
+ Attempting database connection... FAIL
+ Attempting database connection... SUCCESS... FAIL... (client.end() will be executed before node terminates)
+ Attempting database connection... SUCCESS... Attempting to query data... FAIL... Status 500 is sent


Please note, the demo is currently hosted on AWS.  AWS automatically restarts if node crashes / stops due to an error.  Restarting node will trigger the reconnects of all subsequent connections (e.g. client connection, etc).


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