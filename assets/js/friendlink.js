/*!
 * * 《轩玮导航》 - 友情链接模块
 * @package XuWbk
 * @author 轩玮
 * @version 1.0.0
 * @created 文件创建升级
 * @modified 文件修改时间
 * @description 由《轩玮博客》开发用于导航工具系统
 * @contact QQ:6050640 邮箱：6050640@qq.com 网址：www.xuwbk.com
 * @copyright Copyright (c) 2026 by XuWbk.Com, All Rights Reserved.
 *
 * 纯静态实现：申请 / 批准 / 驳回 / 删除 / 恢复，数据存放在浏览器 localStorage，
 * 批准后自动写入前端友链展示区（首页 + 友情链接页），管理员密码：xuwbk.com
 */
(function (window, document) {
    'use strict';

    var STORE_KEY = 'xuwbk_friendlink_v1';
    var ADMIN_KEY = 'xuwbk_friendlink_admin';
    var ADMIN_PASSWORD = 'xuwbk.com';
    /* 服务器共享数据文件：上传到网站 data/links.json 后，所有设备都能读到同一份数据 */
    var BASE = './';
    var currentScript = document.currentScript;
    if (currentScript && currentScript.src) {
        BASE = currentScript.src.replace(/assets\/js\/friendlink\.js(\?.*)?$/i, '');
    }
    var SERVER_JSON = BASE + 'data/links.json';
    var DEFAULT_ICON = 'assets/images/default-icon.webp';
    var DEFAULT_CATEGORY = '常用工具';
    var FAVICON_SCHEME = 'https://';
    /* 站点 favicon 取不到时的二级兜底，与 index.html 静态卡片保持一致 */
    var ICON_API = 'https://api.iowen.cn/favicon/';
    var ICON_FALLBACK_JS = "javascript:var f=this.getAttribute('data-fallback');if(f){this.setAttribute('data-fallback','');this.src=f;}else{this.onerror=null;this.src='" + DEFAULT_ICON + "';}";
    /* 与 index.html 的 data-nav-category 保持一致 */
    var CATEGORIES = [
        '常用工具', '生物信息', '云服务器', '办公学习', '影音视频', '游戏竞技', '网盘资源',
        '图标素材', '图标设计', '平面素材', '字体资源', 'PPT资源', '图形创意', '界面设计',
        '在线配色', '迷你工具', '谷歌插件', '资讯书籍', '博客论坛', '设计规范', '视频教程',
        '主机资源', '域名资源', 'VPS资源', '其他资源'
    ];

    var memoryStore = [];
    /* 导入备份时用于选择备份文件（文本框为空时使用） */
    var importFileInput = null;

    /* ------------------------------ 数据仓储 ------------------------------ */

    /** 旧数据迁移：把写进简介前缀的 [分类] 提取为独立的 category 字段 */
    function migrate(list) {
        var dirty = false;
        list.forEach(function (item) {
            if (!item || typeof item !== 'object') {
                return;
            }
            if (!item.source) {
                item.source = 'link';
            }
            if (!item.category && /^\[[^\]]+\]/.test(item.desc || '')) {
                item.category = /^\[([^\]]+)\]/.exec(item.desc)[1];
            }
            if (/^\[[^\]]+\]\s*/.test(item.desc || '')) {
                item.desc = item.desc.replace(/^\[[^\]]+\]\s*/, '');
                dirty = true;
            }
            if (item.source === 'site' && !item.category) {
                item.category = DEFAULT_CATEGORY;
                dirty = true;
            }
        });
        if (dirty) {
            try {
                window.localStorage.setItem(STORE_KEY, JSON.stringify(list));
            } catch (e) { /* ignore */ }
        }
        return list;
    }

    function read() {
        try {
            var raw = window.localStorage.getItem(STORE_KEY);
            var list = raw ? JSON.parse(raw) : [];
            if (Object.prototype.toString.call(list) !== '[object Array]') {
                return [];
            }
            return migrate(list);
        } catch (e) {
            return memoryStore;
        }
    }

    function write(list) {
        memoryStore = list;
        try {
            window.localStorage.setItem(STORE_KEY, JSON.stringify(list));
        } catch (e) {
            /* 隐私模式或存储不可用时降级为内存存储 */
        }
        return list;
    }

    function list() {
        return read();
    }

    function byStatus(status) {
        return read().filter(function (item) {
            return item.status === status;
        }).sort(function (a, b) {
            return (b.time || 0) - (a.time || 0);
        });
    }

    function find(id) {
        var arr = read();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
        }
        return null;
    }

    function createId() {
        return 'fl_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    /* ------------------------------ 业务操作 ------------------------------ */

    function apply(data) {
        var record = {
            id: createId(),
            name: String(data.name || '').trim(),
            url: normalizeUrl(data.url),
            desc: String(data.desc || '').trim(),
            contact: String(data.contact || '').trim(),
            icon: String(data.icon || '').trim(),
            source: data.source === 'site' ? 'site' : 'link',
            category: String(data.category || '').trim(),
            status: 'pending',
            reason: '',
            time: Date.now(),
            auditTime: 0
        };
        var arr = read();
        arr.push(record);
        write(arr);
        renderAll();
        return record;
    }

    /** 批准：自动加入友链展示区 */
    function approve(id) {
        return change(id, { status: 'approved', reason: '', auditTime: Date.now() });
    }

    /** 驳回：需填写理由 */
    function reject(id, reason) {
        return change(id, { status: 'rejected', reason: String(reason || '').trim(), auditTime: Date.now() });
    }

    /** 驳回恢复为待审核 */
    function restore(id) {
        return change(id, { status: 'pending', reason: '', auditTime: 0 });
    }

    /** 彻底删除 */
    function remove(id) {
        write(read().filter(function (item) {
            return item.id !== id;
        }));
        markDeleted(id);
        renderAll();
        return true;
    }

    function change(id, patch) {
        var arr = read();
        var hit = null;
        arr.forEach(function (item) {
            if (item.id === id) {
                Object.keys(patch).forEach(function (key) {
                    item[key] = patch[key];
                });
                hit = item;
            }
        });
        if (hit) {
            write(arr);
        }
        renderAll();
        return hit;
    }

    function importData(json) {
        var data;
        try {
            data = JSON.parse(json);
        } catch (e) {
            return false;
        }
        if (Object.prototype.toString.call(data) !== '[object Array]') {
            return false;
        }
        write(data);
        clearDeleted();
        renderAll();
        return true;
    }

    /* ------------------------------ 服务器 JSON 同步 ------------------------------ */

    /** 本机删除过的记录 id（墓碑）：服务器 JSON 不会再把它们加回来 */
    function readDeleted() {
        try {
            var v = JSON.parse(window.localStorage.getItem(STORE_KEY + '_deleted'));
            return Object.prototype.toString.call(v) === '[object Array]' ? v : [];
        } catch (e) {
            return [];
        }
    }

    function markDeleted(id) {
        if (!id) {
            return;
        }
        var d = readDeleted();
        if (d.indexOf(id) < 0) {
            d.push(id);
            try {
                window.localStorage.setItem(STORE_KEY + '_deleted', JSON.stringify(d));
            } catch (e) { /* ignore */ }
        }
    }

    function clearDeleted() {
        try {
            window.localStorage.removeItem(STORE_KEY + '_deleted');
        } catch (e) { /* ignore */ }
    }

    /** 合并服务器数据：本机为准，服务器只补充本机没有（且未被本机删除）的记录 */
    function mergeServer(server) {
        if (Object.prototype.toString.call(server) !== '[object Array]' || !server.length) {
            return false;
        }
        var local = read();
        var have = {};
        local.forEach(function (item) {
            if (item && item.id) {
                have[item.id] = true;
            }
        });
        var dead = {};
        readDeleted().forEach(function (id) {
            dead[id] = true;
        });
        var added = 0;
        server.forEach(function (item) {
            if (!item || !item.id || have[item.id] || dead[item.id]) {
                return;
            }
            local.push(item);
            have[item.id] = true;
            added++;
        });
        if (!added) {
            return false;
        }
        write(local);
        return true;
    }

    function hashStr(s) {
        var h = 5381, i = 0;
        for (; i < s.length; i++) {
            h = ((h << 5) + h + s.charCodeAt(i)) | 0;
        }
        return 'h' + h + '_' + s.length;
    }

    /** data/links.json 是"已发布的快照"：
     *  1) 本机没有数据（换设备/无痕）→ 采用快照
     *  2) 快照变了（重新下载上传过）→ 采用新快照
     *  3) 快照没变 → 以本机为准，编辑/删除不会被还原 */
    function handleServer(server, hash) {
        if (Object.prototype.toString.call(server) !== '[object Array]' || !server.length) {
            return false;
        }
        var last = null;
        try {
            last = window.localStorage.getItem(STORE_KEY + '_srv');
        } catch (e) { /* ignore */ }
        var firstVisit = false;
        try {
            firstVisit = window.localStorage.getItem(STORE_KEY) === null;
        } catch (e) {
            firstVisit = true;
        }
        if (firstVisit || (last !== null && last !== hash)) {
            try {
                window.localStorage.setItem(STORE_KEY + '_srv', hash);
            } catch (e) { /* ignore */ }
            write(server);
            return true;
        }
        if (last === null) {
            try {
                window.localStorage.setItem(STORE_KEY + '_srv', hash);
            } catch (e) { /* ignore */ }
        }
        return false;
    }

    /** 拉取 data/links.json，实现跨设备一致（服务器文件不存在时静默降级为本地数据） */
    function syncFromServer(cb) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', SERVER_JSON + '?_=' + Date.now(), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                var ok = false;
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        var txt = String(xhr.responseText).replace(/^\uFEFF/, '');
                        ok = handleServer(JSON.parse(txt), hashStr(txt));
                    } catch (e) {
                        ok = false;
                    }
                }
                if (ok) {
                    renderAll();
                }
                if (cb) {
                    cb(ok);
                }
            };
            xhr.onerror = function () {
                if (cb) {
                    cb(false);
                }
            };
            xhr.send();
        } catch (e) {
            if (cb) {
                cb(false);
            }
        }
    }

    /** 下载当前数据为 links.json，供上传到服务器 data/ 目录 */
    function downloadJson() {
        var blob = new Blob([JSON.stringify(list(), null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'links.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.setTimeout(function () {
            URL.revokeObjectURL(a.href);
        }, 1500);
    }

    /* ------------------------------ 工具方法 ------------------------------ */

    function normalizeUrl(url) {
        var value = String(url || '').trim();
        if (!value) {
            return '';
        }
        if (!/^https?:\/\//i.test(value)) {
            value = 'http://' + value.replace(/^\/+/, '');
        }
        return value;
    }

    function validUrl(url) {
        return /^https?:\/\/[^\s/$.?#][^\s]*\.[^\s]{2,}/i.test(url);
    }

    function hostOf(url) {
        var m = String(url || '').match(/^https?:\/\/([^/]+)/i);
        return m ? m[1] : '';
    }

    /** 图标取值：优先用后台填写的自定义图标，未填则按网址取站点 favicon.ico */
    function iconOf(item) {
        if (item.icon) {
            return item.icon;
        }
        var host = hostOf(item.url);
        return host ? FAVICON_SCHEME + host + '/favicon.ico' : DEFAULT_ICON;
    }

    /** 图标兜底：自定义或自动图标失败时，均先回退第三方 API 抓取，再不行用本地默认图
     *  （自定义图标地址优先作为 src；加载失败才走 api.iowen.cn 抓取该站点 favicon） */
    function iconFallbackAttr(item) {
        var host = hostOf(item.url);
        if (!host && !item.icon) {
            return '';
        }
        var fb = host ? (ICON_API + host + '.png') : DEFAULT_ICON;
        return ' data-fallback="' + escapeHtml(fb) + '"' +
            ' onerror="' + ICON_FALLBACK_JS + '"';
    }

    function escapeHtml(str) {
        return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function formatTime(ts) {
        if (!ts) {
            return '-';
        }
        var d = new Date(ts);
        var p = function (n) {
            return n < 10 ? '0' + n : '' + n;
        };
        return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    }

    /** 兼容旧数据：分类曾写进简介前缀 [分类] */
    function categoryOf(item) {
        if (item.category) {
            return item.category;
        }
        var m = /^\[([^\]]+)\]\s*/.exec(item.desc || '');
        return m ? m[1] : DEFAULT_CATEGORY;
    }

    function descOf(item) {
        return String(item.desc || '').replace(/^\[[^\]]+\]\s*/, '');
    }

    /** 管理表格的「收录分类」单元格：网址提交可以直接改分类 */
    function categoryCell(item) {
        if (item.source !== 'site') {
            return '<span class="fl-muted">友情链接</span>';
        }
        var cur = categoryOf(item);
        var opts = CATEGORIES.indexOf(cur) < 0 ? ['<option value="' + escapeHtml(cur) + '">' + escapeHtml(cur) + '</option>'] : [];
        CATEGORIES.forEach(function (name) {
            opts.push('<option value="' + name + '"' + (name === cur ? ' selected' : '') + '>' + name + '</option>');
        });
        return '<select class="fl-cat" data-id="' + item.id + '">' + opts.join('') + '</select>';
    }

    function statusText(status) {
        return { pending: '待审核', approved: '已通过', rejected: '已驳回' }[status] || status;
    }

    /* ------------------------------ 视图渲染 ------------------------------ */

    /** 渲染已通过的分类网址：插入到首页对应分类卡片区（如「常用工具」） */
    function renderSiteCards() {
        var old = document.querySelectorAll('[data-fl-card]');
        Array.prototype.forEach.call(old, function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });

        var sites = byStatus('approved').filter(function (item) {
            return item.source === 'site';
        });
        var boxes = document.querySelectorAll('[data-nav-category]');
        if (!sites.length || !boxes.length) {
            return;
        }

        var fallback = null;
        Array.prototype.forEach.call(boxes, function (box) {
            if (box.getAttribute('data-nav-category') === DEFAULT_CATEGORY) {
                fallback = box;
            }
        });
        fallback = fallback || boxes[0];

        sites.forEach(function (item) {
            var want = categoryOf(item);
            var box = null;
            Array.prototype.forEach.call(boxes, function (b) {
                if (b.getAttribute('data-nav-category') === want) {
                    box = b;
                }
            });
            if (!box) {
                if (window.console && window.console.warn) {
                    window.console.warn('[轩玮导航] 首页没有「' + want + '」分类容器，已放入「' + DEFAULT_CATEGORY + '」');
                }
                box = fallback;
            }
            box.insertAdjacentHTML('beforeend', siteCardHtml(item));
        });
    }

    /** 网站提交通过的卡片，复用主题 url-card 结构 */
    function siteCardHtml(item) {
        var icon = escapeHtml(iconOf(item));
        return '<div class="url-card col-6  col-sm-6 col-md-4 col-xl-5a col-xxl-6a" data-fl-card="' + item.id + '">' +
            '<div class="url-body default">' +
            '<a href="' + escapeHtml(item.url) + '" target="_blank" data-id="" data-url="' + escapeHtml(item.url) + '" ' +
            'class="card no-c mb-4" data-toggle="tooltip" data-placement="bottom" ' +
            'data-original-title="' + escapeHtml(item.desc || item.name) + '">' +
            '<div class="card-body"><div class="url-content d-flex align-items-center">' +
            '<div class="url-img mr-2 d-flex align-items-center justify-content-center">' +
            '<img class="lazy" src="' + icon + '" data-src="' + icon + '" alt="' + escapeHtml(item.name) + '"' + iconFallbackAttr(item) + '>' +
            '</div>' +
            '<div class="url-info flex-fill">' +
            '<div class="text-sm overflowClip_1"><strong>' + escapeHtml(item.name) + '</strong></div>' +
            '<p class="overflowClip_1 m-0 text-muted text-xs">' + escapeHtml(descOf(item) || hostOf(item.url)) + '</p>' +
            '</div></div></div></a>' +
            '<a href="' + escapeHtml(item.url) + '" class="togo text-center text-muted is-views" data-id="0" ' +
            'data-toggle="tooltip" data-placement="right" title="直达" rel="nofollow">' +
            '<i class="iconfont icon-goto"></i></a>' +
            '</div></div>';
    }

    /** 渲染所有已通过的友链（首页文字链 + 友链页卡片） */
    function renderApproved() {
        var approved = byStatus('approved').filter(function (item) {
            return item.source !== 'site';
        });
        var nodes = document.querySelectorAll('[data-friendlink-approved]');
        Array.prototype.forEach.call(nodes, function (box) {
            var mode = box.getAttribute('data-friendlink-approved') || 'text';
            if (!approved.length) {
                box.innerHTML = '';
                box.setAttribute('data-empty', '1');
                return;
            }
            box.removeAttribute('data-empty');
            box.innerHTML = approved.map(function (item) {
                return mode === 'card' ? cardHtml(item) : textHtml(item);
            }).join('');
        });
        var counters = document.querySelectorAll('[data-friendlink-count]');
        Array.prototype.forEach.call(counters, function (el) {
            el.textContent = approved.length;
        });
    }

    function textHtml(item) {
        return '<a href="' + escapeHtml(item.url) + '" title="' + escapeHtml(item.desc || item.name) + '" target="_blank" rel="nofollow noopener">' +
            escapeHtml(item.name) + '</a>';
    }

    function cardHtml(item) {
        return '<div class="fl-card">' +
            '<a href="' + escapeHtml(item.url) + '" target="_blank" rel="nofollow noopener" class="fl-card-link">' +
            '<span class="fl-card-logo"><img src="' + escapeHtml(iconOf(item)) + '" alt="' + escapeHtml(item.name) + '"' + iconFallbackAttr(item) + '></span>' +
            '<span class="fl-card-body">' +
            '<strong>' + escapeHtml(item.name) + '</strong>' +
            '<em>' + escapeHtml(item.desc || hostOf(item.url)) + '</em>' +
            '</span></a></div>';
    }

    /** 管理面板列表 */
    function renderAdmin() {
        var box = document.getElementById('fl-admin-body');
        if (!box) {
            return;
        }
        var status = box.getAttribute('data-status') || 'pending';
        var arr = status === 'all' ? list().slice().sort(function (a, b) {
            return (b.time || 0) - (a.time || 0);
        }) : byStatus(status);

        if (!arr.length) {
            box.innerHTML = '<tr><td colspan="7" class="fl-empty">暂无记录</td></tr>';
            return;
        }

        box.innerHTML = arr.map(function (item) {
            var actions = [];
            actions.push('<button type="button" class="fl-btn fl-btn-edit" data-act="edit" data-id="' + item.id + '">编辑</button>');
            if (item.status === 'pending') {
                actions.push('<button type="button" class="fl-btn fl-btn-ok" data-act="approve" data-id="' + item.id + '">批准</button>');
                actions.push('<button type="button" class="fl-btn fl-btn-no" data-act="reject" data-id="' + item.id + '">驳回</button>');
            }
            if (item.status === 'rejected') {
                actions.push('<button type="button" class="fl-btn" data-act="restore" data-id="' + item.id + '">恢复待审</button>');
            }
            actions.push('<button type="button" class="fl-btn fl-btn-del" data-act="remove" data-id="' + item.id + '">删除</button>');

            var sourceTag = item.source === 'site'
                ? ' <span class="fl-src">网址提交</span>'
                : ' <span class="fl-src fl-src-link">友链申请</span>';

            var categoryText = categoryCell(item);

            return '<tr data-id="' + item.id + '">' +
                '<td><a href="' + escapeHtml(item.url) + '" target="_blank" rel="nofollow noopener">' + escapeHtml(item.name) + '</a>' +
                '<div class="fl-sub">' + escapeHtml(hostOf(item.url)) + sourceTag + '</div></td>' +
                '<td>' + categoryText + '</td>' +
                '<td class="fl-desc">' + escapeHtml(descOf(item) || '-') + '</td>' +
                '<td>' + escapeHtml(item.contact || '-') + '</td>' +
                '<td><span class="fl-tag fl-tag-' + item.status + '">' + statusText(item.status) + '</span>' +
                (item.reason ? '<div class="fl-sub">理由：' + escapeHtml(item.reason) + '</div>' : '') + '</td>' +
                '<td>' + formatTime(item.time) + '</td>' +
                '<td class="fl-actions">' + actions.join('') + '</td>' +
                '</tr>';
        }).join('');
    }

    function renderCounts() {
        var map = { pending: byStatus('pending').length, approved: byStatus('approved').length, rejected: byStatus('rejected').length };
        map.all = list().length;
        Object.keys(map).forEach(function (key) {
            var el = document.querySelector('[data-fl-count="' + key + '"]');
            if (el) {
                el.textContent = map[key];
            }
        });
    }

    function renderAll() {
        renderApproved();
        renderSiteCards();
        renderCounts();
        if (isAdmin()) {
            renderAdmin();
        }
    }

    /* ------------------------------ 管理员鉴权 ------------------------------ */

    function isAdmin() {
        try {
            return window.sessionStorage.getItem(ADMIN_KEY) === '1';
        } catch (e) {
            return false;
        }
    }

    function login(pwd) {
        if (pwd === ADMIN_PASSWORD) {
            try {
                window.sessionStorage.setItem(ADMIN_KEY, '1');
            } catch (e) { /* ignore */ }
            return true;
        }
        return false;
    }

    function logout() {
        try {
            window.sessionStorage.removeItem(ADMIN_KEY);
        } catch (e) { /* ignore */ }
    }

    function toggleAdminView() {
        var loginBox = document.getElementById('fl-login');
        var panel = document.getElementById('fl-panel');
        if (!loginBox || !panel) {
            return;
        }
        var ok = isAdmin();
        loginBox.style.display = ok ? 'none' : '';
        panel.style.display = ok ? '' : 'none';
        if (ok) {
            renderAdmin();
            renderCounts();
        }
    }

    /* ------------------------------ 页面事件绑定 ------------------------------ */

    function toast(msg, type) {
        var el = document.getElementById('fl-toast');
        if (!el) {
            window.alert(msg);
            return;
        }
        el.textContent = msg;
        el.className = 'fl-toast fl-toast-' + (type || 'ok') + ' show';
        window.setTimeout(function () {
            el.className = 'fl-toast';
        }, 2600);
    }

    function bindApplyForm() {
        var form = document.getElementById('fl-apply-form');
        if (!form) {
            return;
        }
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = form.elements['name'].value.trim();
            var url = form.elements['url'].value.trim();
            var desc = form.elements['desc'].value.trim();
            var contact = form.elements['contact'].value.trim();
            var icon = form.elements['icon'].value.trim();

            if (!name) {
                return toast('请填写网站名称', 'err');
            }
            if (!validUrl(normalizeUrl(url))) {
                return toast('请填写正确的网址，如 https://www.xuwbk.com', 'err');
            }
            if (!desc) {
                return toast('请填写网站简介', 'err');
            }
            if (!contact) {
                return toast('请填写联系方式（QQ 或邮箱）', 'err');
            }

            var exists = list().some(function (item) {
                return hostOf(item.url) === hostOf(normalizeUrl(url)) && item.status !== 'rejected';
            });
            if (exists) {
                return toast('该网站已提交过申请，请耐心等待审核', 'err');
            }

            apply({ name: name, url: url, desc: desc, contact: contact, icon: icon });
            form.reset();
            toast('申请已提交，等待管理员审核', 'ok');
        });
    }

    function bindAdmin() {
        var loginForm = document.getElementById('fl-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var pwd = loginForm.elements['pwd'].value;
                if (login(pwd)) {
                    loginForm.reset();
                    toggleAdminView();
                    toast('已进入管理模式', 'ok');
                } else {
                    toast('管理员密码错误', 'err');
                }
            });
        }

        var logoutBtn = document.getElementById('fl-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                logout();
                toggleAdminView();
                toast('已退出管理模式', 'ok');
            });
        }

        var tabs = document.querySelectorAll('[data-fl-status]');
        Array.prototype.forEach.call(tabs, function (tab) {
            tab.addEventListener('click', function () {
                Array.prototype.forEach.call(tabs, function (t) {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
                var body = document.getElementById('fl-admin-body');
                if (body) {
                    body.setAttribute('data-status', tab.getAttribute('data-fl-status'));
                }
                renderAdmin();
            });
        });

        var body = document.getElementById('fl-admin-body');
        if (body) {
            body.addEventListener('click', function (e) {
                var btn = e.target.closest ? e.target.closest('[data-act]') : null;
                if (!btn) {
                    return;
                }
                var id = btn.getAttribute('data-id');
                var act = btn.getAttribute('data-act');
                var item = find(id);
                if (!item) {
                    return;
                }
                if (act === 'edit') {
                    openEdit(id);
                } else if (act === 'approve') {
                    approveWithCheck(item);
                } else if (act === 'reject') {
                    var reason = window.prompt('请填写驳回理由（将展示给申请人）：', '内容不符合收录要求');
                    if (reason === null) {
                        return;
                    }
                    reject(id, reason);
                    toast('已驳回「' + item.name + '」', 'ok');
                } else if (act === 'restore') {
                    restore(id);
                    toast('已恢复「' + item.name + '」为待审核', 'ok');
                } else if (act === 'remove') {
                    if (window.confirm('确认删除「' + item.name + '」？删除后不可恢复。')) {
                        remove(id);
                        toast('已删除「' + item.name + '」', 'ok');
                    }
                }
            });
        }

        if (body) {
            body.addEventListener('change', function (e) {
                var sel = e.target.closest ? e.target.closest('select.fl-cat') : null;
                if (!sel) {
                    return;
                }
                var target = find(sel.getAttribute('data-id'));
                if (!target) {
                    return;
                }
                change(target.id, { category: sel.value });
                renderAll();
                toast('已把「' + target.name + '」收录到「' + sel.value + '」分类', 'ok');
            });
        }

        var exportHtml = document.getElementById('fl-export-html');
        if (exportHtml) {
            exportHtml.addEventListener('click', function () {
                var approved = byStatus('approved');
                var out = [];

                var sites = approved.filter(function (item) {
                    return item.source === 'site';
                });
                if (sites.length) {
                    out.push('<!-- ===== 网站提交：粘贴到 index.html 对应分类的 <div class="row"> 内 ===== -->');
                    sites.forEach(function (item) {
                        out.push('<!-- ' + categoryOf(item) + ' -->');
                        out.push(siteCardHtml(item).replace(' data-fl-card="' + item.id + '"', ''));
                    });
                }

                var links = approved.filter(function (item) {
                    return item.source !== 'site';
                });
                if (links.length) {
                    out.push('<!-- ===== 友情链接：粘贴到 index.html 友情链接卡片内 ===== -->');
                    links.forEach(function (item) {
                        out.push('<a href="' + item.url + '" title="' + (item.desc || item.name) + '" target="_blank">' + item.name + '</a>');
                    });
                }

                var code = out.join('\n');
                if (!code) {
                    return toast('暂无已通过的记录', 'err');
                }
                showCode(code);
                toast('已生成静态代码，请在下方文本框全选复制', 'ok');
            });
        }

        var exportJson = document.getElementById('fl-export-json');
        if (exportJson) {
            exportJson.addEventListener('click', function () {
                var all = list();
                if (!all.length) {
                    return toast('暂无可备份的数据', 'err');
                }
                showCode(JSON.stringify(all, null, 2));
                toast('已生成备份数据（' + all.length + ' 条），请在下方文本框全选复制', 'ok');
            });
        }

        var downloadBtn = document.getElementById('fl-download-json');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function () {
                downloadJson();
                toast('已下载 links.json，上传覆盖网站 data/links.json 即可全设备同步', 'ok');
            });
        }

        var importBtn = document.getElementById('fl-import-json');
        if (importBtn) {
            importBtn.addEventListener('click', function () {
                var area = document.getElementById('fl-code');
                if (!area || !area.value.trim()) {
                    /* 文本框为空时，改用选择备份文件的方式导入 */
                    if (!importFileInput) {
                        importFileInput = document.createElement('input');
                        importFileInput.type = 'file';
                        importFileInput.accept = 'application/json,.json';
                        importFileInput.style.display = 'none';
                        document.body.appendChild(importFileInput);
                        importFileInput.addEventListener('change', function () {
                            var file = this.files && this.files[0];
                            if (!file) {
                                return;
                            }
                            var rd = new FileReader();
                            rd.onload = function () {
                                var ok = importData(rd.result);
                                toast(ok ? '导入成功' : '数据格式不正确（需要 JSON 数组）', ok ? 'ok' : 'err');
                            };
                            rd.readAsText(file);
                            this.value = '';
                        });
                    }
                    importFileInput.click();
                    toast('请选择备份文件，或把数据粘贴到下方文本框后再点导入', 'err');
                    return;
                }
                var ok = importData(area.value);
                toast(ok ? '导入成功' : '数据格式不正确（需要 JSON 数组）', ok ? 'ok' : 'err');
            });
        }

        var clearBtn = document.getElementById('fl-clear-rejected');
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                var bad = read().filter(function (item) {
                    return item.status === 'rejected';
                });
                if (!bad.length) {
                    return toast('没有已驳回的记录', 'ok');
                }
                if (!window.confirm('确认清空 ' + bad.length + ' 条已驳回的申请？')) {
                    return;
                }
                var gone = bad.map(function (item) {
                    return item.id;
                });
                write(read().filter(function (item) {
                    return item.status !== 'rejected';
                }));
                gone.forEach(markDeleted);
                renderAll();
                toast('已清空 ' + bad.length + ' 条驳回记录', 'ok');
            });
        }
    }

    function showCode(code) {
        var area = document.getElementById('fl-code');
        var wrap = document.getElementById('fl-code-wrap');
        if (!area) {
            return;
        }
        area.value = code;
        /* 注意：CSS 里 .fl-code-wrap 默认 display:none，这里必须显式显示，否则导出没有任何可见效果 */
        if (wrap) {
            wrap.style.display = 'block';
            try {
                wrap.scrollIntoView({ block: 'nearest' });
            } catch (e) {
                wrap.scrollIntoView(false);
            }
        }
        try {
            area.focus();
            area.setSelectionRange(0, area.value.length);
        } catch (e) {
            try {
                area.select();
            } catch (e2) { /* ignore */ }
        }
    }

    /* ------------------------------ 编辑弹窗 ------------------------------ */

    function editEls() {
        return {
            modal: document.getElementById('fl-edit-modal'),
            form: document.getElementById('fl-edit-form'),
            id: document.getElementById('fl-edit-id'),
            name: document.getElementById('fl-edit-name'),
            url: document.getElementById('fl-edit-url'),
            desc: document.getElementById('fl-edit-desc'),
            contact: document.getElementById('fl-edit-contact'),
            icon: document.getElementById('fl-edit-icon'),
            source: document.getElementById('fl-edit-source'),
            category: document.getElementById('fl-edit-category'),
            status: document.getElementById('fl-edit-status'),
            reason: document.getElementById('fl-edit-reason'),
            rowCategory: document.getElementById('fl-row-category'),
            rowReason: document.getElementById('fl-row-reason')
        };
    }

    function fillCategoryOptions() {
        var el = editEls();
        if (!el.category || el.category.getAttribute('data-filled')) {
            return;
        }
        CATEGORIES.forEach(function (name) {
            var opt = document.createElement('option');
            opt.value = name;
            opt.textContent = name;
            el.category.appendChild(opt);
        });
        el.category.setAttribute('data-filled', '1');
    }

    function syncEditRows() {
        var el = editEls();
        if (el.rowCategory) {
            el.rowCategory.style.display = el.source.value === 'site' ? '' : 'none';
        }
        if (el.rowReason) {
            el.rowReason.style.display = el.status.value === 'rejected' ? '' : 'none';
        }
    }

    function openEdit(id) {
        var el = editEls();
        var item = find(id);
        if (!el.modal || !item) {
            return;
        }
        fillCategoryOptions();

        var cat = categoryOf(item);
        if (CATEGORIES.indexOf(cat) < 0) {
            var extra = document.createElement('option');
            extra.value = cat;
            extra.textContent = cat + '（首页无此分类）';
            el.category.appendChild(extra);
        }

        el.id.value = item.id;
        el.name.value = item.name || '';
        el.url.value = item.url || '';
        el.desc.value = descOf(item) || '';
        el.contact.value = item.contact || '';
        el.icon.value = item.icon || '';
        el.source.value = item.source === 'site' ? 'site' : 'link';
        el.status.value = item.status;
        el.reason.value = item.reason || '';
        el.category.value = cat;
        syncEditRows();
        el.modal.className = 'fl-modal show';
    }

    function closeEdit() {
        var el = editEls();
        if (el.modal) {
            el.modal.className = 'fl-modal';
        }
    }

    /** 读取弹窗表单并写回存储 */
    function saveEditForm() {
        var el = editEls();
        var item = find(el.id.value);
        if (!item) {
            return null;
        }
        var isSite = el.source.value === 'site';
        var patch = {
            name: el.name.value.trim(),
            url: normalizeUrl(el.url.value.trim()),
            desc: el.desc.value.trim(),
            contact: el.contact.value.trim(),
            icon: el.icon.value.trim(),
            source: isSite ? 'site' : 'link',
            category: isSite ? (el.category.value || DEFAULT_CATEGORY) : '',
            status: el.status.value,
            reason: el.status.value === 'rejected' ? el.reason.value.trim() : ''
        };
        change(item.id, patch);
        return find(item.id);
    }

    /** 批准后必定落到首页真实存在的分类 */
    function approveWithCheck(item) {
        if (item.source === 'site') {
            var cat = categoryOf(item);
            if (CATEGORIES.indexOf(cat) < 0) {
                return toast('首页没有「' + cat + '」分类，请先点「编辑」选择正确的分类', 'err');
            }
            if (!item.category) {
                change(item.id, { category: cat });
            }
            approve(item.id);
            toast('已批准「' + item.name + '」，已加入「' + cat + '」分类', 'ok');
            return;
        }
        approve(item.id);
        toast('已批准「' + item.name + '」，已加入友情链接', 'ok');
    }

    function bindEditForm() {
        var el = editEls();
        if (!el.form) {
            return;
        }
        fillCategoryOptions();

        el.form.addEventListener('submit', function (e) {
            e.preventDefault();
            var item = saveEditForm();
            closeEdit();
            if (item) {
                toast('已保存「' + item.name + '」', 'ok');
            }
        });

        el.source.addEventListener('change', syncEditRows);
        el.status.addEventListener('change', syncEditRows);

        Array.prototype.forEach.call(el.modal.querySelectorAll('[data-fl-close]'), function (btn) {
            btn.addEventListener('click', closeEdit);
        });

        var approveBtn = document.getElementById('fl-save-approve');
        if (approveBtn) {
            approveBtn.addEventListener('click', function () {
                var item = saveEditForm();
                if (!item) {
                    return;
                }
                approveWithCheck(item);
                renderAll();
                closeEdit();
            });
        }

        var rejectBtn = document.getElementById('fl-save-reject');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function () {
                var el2 = editEls();
                if (el2.status.value !== 'rejected') {
                    el2.status.value = 'rejected';
                    syncEditRows();
                }
                if (!el2.reason.value.trim()) {
                    el2.reason.value = '内容不符合收录要求';
                }
                var item = saveEditForm();
                renderAll();
                closeEdit();
                if (item) {
                    toast('已驳回「' + item.name + '」', 'ok');
                }
            });
        }

        var removeBtn = document.getElementById('fl-save-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', function () {
                var el3 = editEls();
                var item = find(el3.id.value);
                if (item && window.confirm('确认删除「' + item.name + '」？删除后不可恢复。')) {
                    remove(item.id);
                    closeEdit();
                    toast('已删除「' + item.name + '」', 'ok');
                }
            });
        }
    }

    /* ------------------------------ 初始化 ------------------------------ */

    function init() {
        bindApplyForm();
        bindAdmin();
        bindEditForm();
        toggleAdminView();
        renderAll();
        syncFromServer();
        window.addEventListener('storage', function (e) {
            if (e.key === STORE_KEY) {
                renderAll();
            }
        });
    }

    window.XuWbkFriendLink = {
        version: '1.0.0',
        storeKey: STORE_KEY,
        ADMIN_PASSWORD: ADMIN_PASSWORD,
        list: list,
        byStatus: byStatus,
        apply: apply,
        approve: approve,
        reject: reject,
        restore: restore,
        remove: remove,
        importData: importData,
        syncFromServer: syncFromServer,
        downloadJson: downloadJson,
        isAdmin: isAdmin,
        login: login,
        logout: logout,
        renderAll: renderAll,
        renderApproved: renderApproved,
        categories: CATEGORIES,
        defaultCategory: DEFAULT_CATEGORY,
        openEdit: openEdit,
        closeEdit: closeEdit,
        update: change,
        approveWithCheck: approveWithCheck
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window, document);
