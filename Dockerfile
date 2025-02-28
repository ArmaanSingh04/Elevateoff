FROM node:20-alpine

WORKDIR /app
ARG DATABASE_URL

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

ENV DATABASE_URL=${DATABASE_URL}
ENV NEXTAUTH_SECRET="fuckaroundandfindout"
ENV NEXTAUTH_URL="http://localhost:3000"

COPY prisma ./
RUN pnpm prisma migrate deploy
RUN pnpm dlx prisma generate

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["pnpm" , "start"]