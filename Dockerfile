# syntax=docker/dockerfile:latest

FROM --platform=$BUILDPLATFORM node:22.12.0-bullseye-slim as builder

WORKDIR /app
COPY . .

RUN cd portfolio && npm install
