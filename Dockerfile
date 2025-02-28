FROM node:20-alpine

WORKDIR /app
ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

COPY prisma ./
RUN pnpm prisma migrate deploy
RUN pnpm dlx prisma generate

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["pnpm" , "start"]