FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /msugradesapI
WORKDIR /msugradesapI
COPY . /msugradesapI/

RUN pip3 install gunicorn
RUN pip3 install -r requirements.txt

CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app", "--workers=5"]