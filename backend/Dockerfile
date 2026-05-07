FROM node:20.15.0
# 定位到容器工作目录
WORKDIR /app

# 更改 NPM 下载源为淘宝源，并设置为全局持久化
RUN npm config set -g registry https://registry.npm.taobao.org
# 将当前目录中的package.json和package-lock.json复制到容器中
COPY package*.json ./

# 安装依赖项
RUN npm install
# 将当前目录中的所有文件复制到容器中
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
