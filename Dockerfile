FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /msugradesapi
WORKDIR /msugradesapi
COPY . /msugradesapi/

RUN pip3 install -r requirements.txt
EXPOSE 5000