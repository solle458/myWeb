# syntax=docker/dockerfile:latest

FROM --platform=$BUILDPLATFORM node:22.12.0-bullseye-slim as builder

WORKDIR /app/frontend
COPY frontend .

RUN npm install

FROM --platform=$BUILDPLATFORM golang:1.21-bullseye AS backend

WORKDIR /app/backend
COPY backend .

# RUN go mod tidy

