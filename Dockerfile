FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /msugradesapi
WORKDIR /msugradesapi
COPY . /msugradesapi/

RUN pip3 install gunicorn
RUN pip3 install -r requirements.txt

CMD ["gunicorn", "-b", ":443", "--certfile", "/certs/msugradesapi.com.pem", "--keyfile", "/certs/msugradesapi.com.key", "app:app", "--workers=5"]