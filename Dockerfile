FROM node:18-slim

ENV LC_ALL=C.UTF-8
WORKDIR /home/project

# Install base utils
RUN apt-get update
RUN apt-get install -y \
  curl \
  psmisc

# Install Node.js
RUN curl -fsSL "https://deb.nodesource.com/setup_18.x" | bash -
RUN apt-get install -y nodejs

# Install Yarn
RUN corepack enable

CMD ["/bin/bash"]
