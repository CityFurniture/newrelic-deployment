# Newrelic - Deployment Record
#
#     docker build --rm=true -t CityFurniture/newrelic-deployment .
FROM mhart/alpine-node:10
MAINTAINER Rabea Abdelwahab <rabeea@city-furniture.com>


WORKDIR /drone/src

COPY plugin /drone/src

CMD ["node","plugin/index.js"]
