---
title: Dockerfile
---
FROM ubuntu:16.04

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y build-essential git python2.7 python-pip

# Install CRF++.
RUN git clone https://github.com/mtlynch/crfpp.git && \
    cd crfpp && \
    ./configure && \
    make && \
    make install && \
    cd ..

# Apply workaround so CRF++ runs.
RUN echo "/usr/local/lib" > /etc/ld.so.conf.d/local.conf && ldconfig

# Install ingredient-phrase-tagger.
RUN git clone https://github.com/mtlynch/ingredient-phrase-tagger.git && \
    cd ingredient-phrase-tagger && \
    python setup.py install
