# Newrelic - Deployment Record
#
#     docker build --rm=true -t CityFurniture/newrelic-deployment .
FROM mhart/alpine-node:10
MAINTAINER Rabea Abdelwahab <rabeea@city-furniture.com>


RUN mkdir -p /opt/drone
WORKDIR /opt/drone

COPY plugin /opt/drone/

CMD ["node","index.js"]
