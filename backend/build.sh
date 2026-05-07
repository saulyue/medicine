#!/bin/bash
# 定义颜色变量
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE="\033[0;36m"     # Info message
PLAIN='\033[0;0m' # 重置颜色
NC='\033[0m' # 重置颜色

branch="prod_backend.sh"

date_now=`date "+%Y%m%d%H%M%S"`
echo "${BLUE}当前日期：$(date "+%Y-%m-%d %H:%M:%S")${NC}"
node_version=$(node -v | cut -d "v" -f 2|cut -d "." -f 1)  # 获取 Node.js 版本号，假设输出格式为 "v14.12.0"
if (($node_version < 20 )); then
  echo "${RED}Error: Node.js 执行版本要大于 20${NC}"
  exit 1
fi

rm -rf medicsale_back.tar
docker build -t medicsale_back:$date_now .
#docker save -o medicsale_back.tar medicsale_back:$date_now
#scp medicsale_back.tar tc:/root/
#
#ssh tc "sh /root/${branch}"
