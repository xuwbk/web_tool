# Web Tool

一个轻量级的静态工具导航与资源分享网站，支持网址提交与本地存储展示。

## 🌐 在线访问

项目已成功部署至 GitHub Pages，访问地址如下：

👉 **[https://yanchtao.github.io/web-tool/](https://yanchtao.github.io/web-tool/)**

（注：部署用户名为 `yanchtao`，项目路径为 `web-tool`）

## ✨ 功能特性

- **静态站点**：纯 HTML/CSS/JS 构建，无需后端服务，加载迅速。
- **工具导航**：首页展示各类常用工具与资源链接。
- **本地提交**：支持通过页面表单提交新网址，数据暂存于浏览器 `localStorage`。
- **多页面结构**：包含首页、提交记录（commit）与关于（about）页面。
- **响应式设计**：适配不同设备屏幕尺寸。

## 📁 目录结构
├── web-tool/               # 站点核心目录（部署发布根）

│   ├── index.html          # 网站首页

│   ├── commit.html         # 提交记录页

│   ├── 404.html            # 自定义 404 页面

│   ├── about/

│   │   └── index.html      # 关于页面

│   └── assets/             # 静态资源（CSS/JS/图片）

├── .github/

│   └── workflows/

│       └── deploy.yml      # GitHub Actions 自动部署配置

├── app.py                  # [已弃用] 原 infrlo 测试服务脚本

├── requirements.txt        # [已弃用] 原 Python 依赖

└── README.md
## 🚀 部署说明

### 当前部署方式：GitHub Pages (推荐)

项目采用 **GitHub Actions** 进行自动构建与部署：
1. 源码推送至 `main` 分支后，Action 会自动将 `web-tool/` 目录内容拷贝至 `_site` 发布根。
2. GitHub Pages 设置中 `Source` 选择为 `GitHub Actions`。
3. 部署成功后即可通过上述在线地址访问。

> **路径注意**：项目文件夹为 `web-tool`（连字符），HTML 内部资源均使用相对路径（如 `assets/...`），确保在子路径下正常加载。

### 历史尝试：infrlo.com (已弃用)

曾尝试将 `app.py`（`python -m http.server`）部署至 infrlo 容器，虽本地监听 `0.0.0.0:3000` 成功，但平台网关持续返回 `Bad Gateway`（未正确注入 `$PORT` 且不支持纯静态 Python 服务）。
**结论**：infrlo 不适合此类静态站托管，已彻底弃用，专注 GitHub Pages。

## 🛠️ 本地开发

如需本地预览：
进入站点目录

cd web-tool

启动简易本地服务（Python）

python -m http.server 8000

或（Node.js）

npx serve .
访问 `http://localhost:8000` 即可。

## 📜 开源协议

MIT License
补充建议：

你仓库根目录的 app.py 和 requirements.txt 如果确定不再需要，可以删除（保持仓库整洁，只留 web-tool 静态文件），我已在 README 中标注为“已弃用”。
若后续想加自定义域名，可在 web-tool/ 下加 CNAME 文件，Actions 会自动携带部署。
