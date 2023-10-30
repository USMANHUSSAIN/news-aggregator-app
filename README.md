

# News Aggregator App 
###(Laravel10 & React18)

### - Project Running & Installation Guide (Docker)

In order to run this project, _clone_ the `repository` before proceeding further.

**Note**: Please ensure you have `docker` installed on your system.

1. Setup `.env` file inside the `news-aggregator-backend` folder, you can get all the value from `env.example` for your convenience.

2. Execute the following command in your terminal:
```bash
docker-compose build --no-cache
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; After finished, proceed to execute
```bash
docker-compose up
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and wait for the programs to start. _(please note that this might take a while)_

3.  Open another terminal, execute
```bash
docker-compose exec laravel sh
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by
```bash
php artisan migrate
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to migrate all the migration scripts to your _mysql database on the container_

4. Open `http://localhost:3000` to browse through the *news-aggregator application*!

**PS**: <br/>
You might need to run ```npm install``` and ```composer install``` in `news-aggregator-frontend` and
`news-aggregator-backend` respectively.

If you are encountering `[SQL] Connection Refused` error when hitting an endpoint, make sure to follow the `.env.example` file or other settings on your machine.

If the issue persist, execute `docker-compose ps` and copy the mysql *container name* to and execute the followings
```bash
docker inspect <container_name>
```
 copy the value from **"IpAddress"** and replace the value inside `.env` *DB_HOST*
