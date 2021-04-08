FROM golang:alpine3.12 as compiler

WORKDIR /builder
COPY main.go .

RUN go build -o  app ./main.go

FROM scratch
COPY --from=compiler /builder/app app
CMD ["/app"]