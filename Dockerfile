# Newrelic - Deployment Record
#
#     docker build --rm=true -t CityFurniture/newrelic-deployment .

FROM jfloff/alpine-python
MAINTAINER Rabea Abdelwahab <rabeea@city-furniture.com>

RUN mkdir -p /opt/drone
COPY requirements.txt /opt/drone/
WORKDIR /opt/drone
RUN pip install -r requirements.txt
COPY plugin /opt/drone/

ENTRYPOINT ["python", "/opt/drone/main.py"]
