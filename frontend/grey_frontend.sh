#!/bin/bash
# 定义颜色变量
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE="\033[0;36m"     # Info message
PLAIN='\033[0;0m' # 重置颜色
NC='\033[0m' # 重置颜色

image_name=$(echo `docker load -i medicsale.tar | sed 's/Loaded image: //'`)
docker_id=$(echo `docker ps -q --filter "publish=8001/tcp"`)

echo -e "${GREEN}镜像ID：${image_name}${NC}"
if [ -z "$docker_id" ];then
  echo -e "${RED}docker没有在运行的容器${NC}"
else
  echo -e "${GREEN}docker运行的容器id是${docker_id}${NC}"
  docker stop $docker_id
  docker rm $docker_id
fi

docker run -d -p 8001:80 --name medicsale_gray "$image_name"
docker ps


