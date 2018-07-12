---
title: Dockerfile
---
FROM ubuntu:16.04
LABEL maintainer="Michael Lynch <michael@mtlynch.io>"

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y build-essential git python2.7 python-pip

RUN git clone https://github.com/mtlynch/crfpp.git && cd crfpp && ./configure && make && make install && cd ..
RUN echo "/usr/local/lib" > /etc/ld.so.conf.d/local.conf && ldconfig

RUN git clone https://github.com/mtlynch/ingredient-phrase-tagger.git && cd ingredient-phrase-tagger && python setup.py install && cd ..

# Clean up.
RUN rm -rf /var/lib/apt/lists/* && \
    rm -Rf /usr/share/doc && \
    rm -Rf /usr/share/man && \
    apt-get autoremove -y && \
    apt-get clean

WORKDIR /app
