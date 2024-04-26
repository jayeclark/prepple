FROM public.ecr.aws/amazoncorretto/amazoncorretto:21 as base

FROM base as build
WORKDIR /src
COPY . .

RUN ./gradlew build

FROM registry.access.redhat.com/ubi8/openjdk-21:1.18

ENV LANGUAGE='en_US:en'

COPY --from=build --chown=185 src/build/quarkus-app/ /deployments/

EXPOSE 8080
USER 185
ENV JAVA_OPTS_APPEND="-Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"

ENTRYPOINT [ "/opt/jboss/container/java/run/run-java.sh" ]

