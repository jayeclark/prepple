FROM public.ecr.aws/docker/library/node:16.16.0-slim as builder
WORKDIR /app
COPY . /app
RUN yarn install && yarn run build

FROM public.ecr.aws/docker/library/node:16.16.0-slim as runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.6.4 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=3000 NODE_ENV=production 
ENV AWS_LWA_ENABLE_COMPRESSION=true
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/run.sh ./run.sh
RUN ln -s /tmp/cache ./.next/cache

CMD exec ./run.sh
