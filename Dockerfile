#############
## Install ##
#############
FROM images.artifactory.dunnhumby.com/node:12 as install

WORKDIR /app

COPY package*.json ./
RUN ["npm", "ci"]

#################
## Copy Source ##
#################
FROM install as source
COPY . .

###########
## Build ##
###########
FROM source as build
RUN ["npm", "run", "build:github"]

##########
## Test ##
##########
FROM source as test
VOLUME ["/app/coverage", "/app/logs"]
ENTRYPOINT ["npm", "run", "test:coverage"]

#############
## Final ##
#############
FROM images.artifactory.dunnhumby.com/nginx:1.17 as final

COPY ./deploy/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]