# Nenory Music


### Install
if you wish to install this website, you need execute the next command.
```sh 
$ docker-compose build
```

### Start services
if you wish to start this website, first you need to have .env file inside the project, you can copy the file .env.example and make a new file called .env, if you use linux the command is next.
```sh
$ cp .env.example .env
```
then you can start the website with the next command
```sh
$ docker-compose up
```
you have to remind that there is a environment variable called PORT that allow you change port of your website if you will need it.


then you have you are sure that you ran the migrations, if you didn't run the migrations execute the next command 
```sh
# this command allow you get into the console where is your website 
$ docker-compose exec web sh

# this command execute the migrations
$ php artisan migrate

# this commando execute the seed from website 
$ php artisan db:seed
```