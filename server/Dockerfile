FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

RUN mkdir -p logs public uploads tmp && \
chown -R nodejs:nodejs /app && \
chmod -R 755 /app
USER nodejs
EXPOSE 3000
CMD ["npm", "run", "start"]