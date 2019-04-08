FROM lambci/lambda:build-nodejs8.10

RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo \
  && yum install -y yarn \
  && rm -rf /var/cache/yum/* \
  && yum clean all
