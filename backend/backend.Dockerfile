#FROM alpine:latest
FROM maven:3.6.3-openjdk-14-slim AS build 
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

FROM openjdk:8-jdk-slim
ARG JAR_FILE="./target/mgb-0.0.1-SNAPSHOT.jar"
COPY ${JAR_FILE} "app.jar"

#ADD tarjet/mgb-0.0.1-SNAPSHOT.jar dodo.jar
#EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
#CMD ["/bin/sh"]
