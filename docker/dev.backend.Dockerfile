FROM minizinc/minizinc:2.8.2-jammy

RUN mkdir -p /usr/src/flask
WORKDIR /usr/src/flask


RUN apt-get update -y && apt-get install -y python3 python3-pip

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .