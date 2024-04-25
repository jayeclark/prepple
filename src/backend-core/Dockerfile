FROM public.ecr.aws/amazoncorretto/amazoncorretto:21 as base

FROM base as build
RUN yum install -y gradle
WORKDIR /src

RUN ./gradlew build

COPY --from=build /src/target/dependency/*.jar ./
COPY --from=build /src/target/*.jar ./

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.9
WORKDIR /work/
RUN chown 1001 /work \
    && chmod "g+rwX" /work \
    && chown 1001:root /work
COPY --chown=1001:root build/*-runner /work/application

EXPOSE 8080
USER 1001

ENTRYPOINT ["./application", "-Dquarkus.http.host=0.0.0.0"]
