cp -rf config migrations seeders models ../mntd-pass/packages/mntd-db

docker pull redis # download redis
sudo apt install redis # redis tools with Linux
docker run -p 6379:6379 -d redis # create container of redis

redis-cli
# commands redis
# dashabilitar en producción porque puede generar overhead
KEYS * # show keys
SET mntd pass # create key
SET mntd pass EX 15 # create key with timeout
GET mntd # get value of key
TYPE mntd # type of data

# list
RPUSH secrets my-value # create list
LLEN # list length - size
LPOP # delete first element of the list
LINSERT secrets BEFORE|AFTER pivot value # insert values
LSET secrets 4 other # set value of a value created
LRANGE secrets 0 1 # show list with a range

# hash
HSET user username mntd # create hash
HSET user fullname "MNTD" # add value to hash
HEXISTS user fullname # exists value in hash
HGETALL user # get all hash values