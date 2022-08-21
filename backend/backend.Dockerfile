#FROM alpine:latest
FROM  openjdk:8-jdk-slim
ARG JAR_FILE="./target/mgb-0.0.1-SNAPSHOT.jar"
COPY ${JAR_FILE} "app.jar"

#ADD tarjet/mgb-0.0.1-SNAPSHOT.jar dodo.jar
#EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
#CMD ["/bin/sh"]
