docker pull mongo
docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=mongopass123 -p 27017:27017 mongo
connection string "mongo://admin:mongopass123@localhost:27017"
connect using nosqlbooster
right click and create "imaginify" database