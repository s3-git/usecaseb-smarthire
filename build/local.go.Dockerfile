FROM golang:1.25

RUN apt-get update

RUN GO111MODULE=on go install golang.org/x/tools/cmd/goimports@v0.25.0

RUN GO111MODULE=on go install github.com/aarondl/sqlboiler/v4@v4.19.5 && \
    GO111MODULE=on go install github.com/aarondl/sqlboiler/v4/drivers/sqlboiler-psql@v4.19.5
