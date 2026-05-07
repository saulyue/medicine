# Medicine — 医药管理系统 Monorepo

医药进销存管理系统，前后端分离架构。

## 结构

```
frontend/   → Ant Design Pro (Umi Max)，管理后台 UI
backend/    → NestJS + Next.js 12 (SSR) + SQLite
```

## 本地开发

```bash
# 前端
cd frontend && pnpm install && pnpm dev

# 后端
cd backend && pnpm install && pnpm dev
```

## 部署

```bash
docker compose up -d --build
```

- 前端：构建产物 → Nginx 静态托管 → :8080
- 后端：NestJS + Next SSR → :3001
- 域名：med.saulyue.site
