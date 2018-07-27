---
title: Dockerfile
---
FROM ubuntu:16.04

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y build-essential git python2.7 python-pip ruby

# Install CRF++.
RUN git clone https://github.com/mtlynch/crfpp.git && \
    cd crfpp && \
    ./configure && \
    make && \
    make install && \
    ldconfig && \
    cd ..

# Install ingredient-phrase-tagger.
ADD . /ingredient-phrase-tagger
WORKDIR /ingredient-phrase-tagger
RUN python setup.py install
