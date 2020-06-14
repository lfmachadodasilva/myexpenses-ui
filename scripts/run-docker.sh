docker build . -t final
docker run -p 3000:80 --rm -i final