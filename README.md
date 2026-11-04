# XinSpect 官网

静态单页官网，部署在 Cloudflare Pages，自定义域名 https://xinspect.de5.net。

## 架构

```
GitHub (main 分支 push)
  → GitHub Actions (.github/workflows/deploy.yml, wrangler-action v3)
  → Cloudflare Pages 项目 xinspect-web
  → https://xinspect.de5.net + https://xinspect-web.pages.dev
```

- 托管：Cloudflare Pages 免费版（静态资源）
- 部署 secrets（GitHub 仓库设置中）：`CLOUDFLARE_API_TOKEN`（Pages Edit 权限）、`CLOUDFLARE_ACCOUNT_ID`
- 无构建步骤，仓库根目录即发布目录

## 设计：白色瑞士现代主义

2026-11 由 Gemini (Argon) 生成，以 `gemini-swiss.css` 作为**最后加载的覆盖样式表**实现，不改原文件。

设计规范：
- 背景 `#ffffff`、文字 `#111111`、强调色瑞士红 `#e2231a`、分隔线 `#e6e6e6`
- 直角（radius 0）、无阴影、无渐变、无 backdrop-filter
- Helvetica/Arial 字体，大写灰色眉标签，红色大数字，方形按钮

关键实现点（`gemini-swiss.css` 开头的 SWISS HARDENING 块）：
- 用 `!important` 接管站点变量 `--page/--surface/--ink/--line/--brand-blue/--radius/--shadow`，且同时覆盖 `:root` 与 `:root[data-theme="dark"]`（站点 JS 会强制深色主题）
- 隐藏原生 `#themeToggle`
- 更新样式后记得同步递增 `index.html` 中 `gemini-swiss.css` 的 `?v=` 查询参数以破缓存

## 文件说明

| 文件 | 作用 |
|---|---|
| `index.html` | 页面结构 |
| `styles.css` 等 | 原始站点样式（保持未改） |
| `redesign.css` / `acrylic.css` | 早期主题遗留，被 swiss 覆盖 |
| `gemini-swiss.css` | 瑞士风格覆盖样式表（当前生效） |
| `script.js` | 站点交互 |

## 本地操作

```bash
# 部署 = push 到 main，Actions 自动完成
git push

# 本地截图验证（headless Chrome）
chrome --headless=new --window-size=1280x1080 --screenshot="C:\abs\path\shot.png" https://xinspect.de5.net
```

## 后续扩展

- 需要表单后端 / 动态数据时，用 Cloudflare Workers + D1/KV；现有 API token 只有 Pages Edit 权限，届时需在 Cloudflare 后台新建更宽权限的 token 并更新 GitHub secret。
