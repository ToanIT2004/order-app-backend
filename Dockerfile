# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Expose cổng (nếu cần)
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "start"]