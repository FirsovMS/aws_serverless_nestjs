# Serverless from scratch
## Here is a small pet project to create serveless web app
Tech: nestjs, graphql, aws lambda, docker with postgres container, terraform

## Environment
You might need to create .env file in `app` folder with special parameters like this:

``POSTGRES_HOST=127.0.0.1``

``POSTGRES_PORT=5432``

``POSTGRES_USER=postgres``

``POSTGRES_PASSWORD=example``

``POSTGRES_DATABASE=nest``

``MAPBOX_TOKEN=<your mapbox token here>``

``SERVER_PORT=3001``

## How to run it?
1) Clone repository and open command prompt inside base directory.
2) Run `docker compose up`. That will create a container runned app with postgress db inside.
3) Go to `app` folder, that contains small nestjs web-app. I choosed `yarn`, it's more convenient for me. By running command `yarn build` you'll push dependecies and create new build.    
4) I'm also using Terraform here to simplify delivery. Please,specify your `account_id` and `secrets`. I've used external file, that refers to 'aws CLI' credentials. 
5) Just go inside `terraform` folder and run there `terraform apply`. It will create zip archive with latest build bandle that you have and push it to your aws account.