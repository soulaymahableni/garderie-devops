# Image Jenkins prête pour ce projet : Jenkins + Node.js 20 + Docker CLI
FROM node:20-bookworm-slim AS node
FROM docker:cli AS dockercli

FROM jenkins/jenkins:lts-jdk17
USER root

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -sf /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
 && ln -sf /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

COPY --from=dockercli /usr/local/bin/docker /usr/local/bin/docker

USER jenkins
