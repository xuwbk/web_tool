/*!
 * * 《轩玮导航》 - 外链跳转确认弹窗
 * @package XuWbk
 * @author 轩玮
 * @contact QQ:6050640 邮箱：6050640@qq.com 网址：www.xuwbk.com
 * @description 点击站外链接时弹出居中确认框，避免直接跳离本站
 */
(function () {
    'use strict';

    if (window.__xuwbkLinkGuard) {
        return;
    }
    window.__xuwbkLinkGuard = true;

    var script = document.currentScript;
    var BASE = './';
    if (script && script.src) {
        BASE = script.src.replace(/assets\/js\/link-guard\.js(\?.*)?$/i, '');
    }

    var LOGO = BASE + 'assets/images/xuwbk01.png';

    function injectCss() {
        if (document.getElementById('link-guard-css')) {
            return;
        }
        var link = document.createElement('link');
        link.id = 'link-guard-css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = BASE + 'assets/css/link-guard.css';
        (document.head || document.documentElement).appendChild(link);
    }

    injectCss();

    var LINK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
        '<path d="M10 13a5 5 0 0 0 7.1 0l2.2-2.2a5 5 0 0 0-7.1-7.1L11 5"/>' +
        '<path d="M14 11a5 5 0 0 0-7.1 0L4.7 13.2a5 5 0 0 0 7.1 7.1L13 19"/></svg>';

    var LOCK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M12 2.5 4.5 5.5v5.7c0 4.7 3.1 8.3 7.5 10.3 4.4-2 7.5-5.6 7.5-10.3V5.5z"/>' +
        '<path d="M8.5 11.5V10a3.5 3.5 0 0 1 7 0v1.5"/>' +
        '<rect x="8.5" y="11.5" width="7" height="5" rx="1"/></svg>';

    var mask = null;
    var dialog = null;
    var urlText = null;
    var goBtn = null;
    var homeBtn = null;
    var pendingUrl = '';

    function build() {
        if (mask) {
            return;
        }
        mask = document.createElement('div');
        mask.className = 'lg-mask';
        mask.setAttribute('role', 'dialog');
        mask.setAttribute('aria-modal', 'true');
        mask.setAttribute('aria-label', '即将跳转到外部网站');
        mask.innerHTML =
            '<div class="lg-dialog">' +
            '<img class="lg-logo" src="' + LOGO + '" alt="轩玮博客">' +
            '<h3 class="lg-title">即将跳转到外部网站</h3>' +
            '<p class="lg-sub">跳转网站安全性未知，是否继续</p>' +
            '<div class="lg-url">' +
            '<span class="lg-url-icon">' + LINK_ICON + '</span>' +
            '<span class="lg-url-text"></span>' +
            '</div>' +
            '<div class="lg-actions">' +
            '<button type="button" class="lg-btn lg-btn-go">继续前往</button>' +
            '<button type="button" class="lg-btn lg-btn-home">回到主页</button>' +
            '</div>' +
            '<div class="lg-secure">' +
            '<div class="lg-secure-top">' + LOCK_ICON + '<span>secure</span></div>' +
            '<div class="lg-secure-text">安全加密</div>' +
            '</div>' +
            '</div>';
        document.body.appendChild(mask);

        dialog = mask.querySelector('.lg-dialog');
        urlText = mask.querySelector('.lg-url-text');
        goBtn = mask.querySelector('.lg-btn-go');
        homeBtn = mask.querySelector('.lg-btn-home');

        goBtn.addEventListener('click', function () {
            var url = pendingUrl;
            hide();
            if (url) {
                var win = window.open(url, '_blank');
                if (win) {
                    try { win.opener = null; } catch (e) { /* ignore */ }
                }
            }
        });

        homeBtn.addEventListener('click', function () {
            hide();
        });

        mask.addEventListener('click', function (e) {
            if (e.target === mask) {
                hide();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mask.classList.contains('lg-open')) {
                hide();
            }
        });
    }

    function show(url) {
        build();
        pendingUrl = url;
        urlText.textContent = url;
        mask.classList.add('lg-open');
        document.body.classList.add('lg-locked');
        setTimeout(function () {
            if (goBtn) {
                goBtn.focus();
            }
        }, 60);
    }

    function hide() {
        if (!mask) {
            return;
        }
        mask.classList.remove('lg-open');
        document.body.classList.remove('lg-locked');
        pendingUrl = '';
    }

    function isExternal(rawHref) {
        if (!rawHref) {
            return false;
        }
        var href = rawHref.trim();
        if (!/^https?:\/\//i.test(href)) {
            return false;
        }
        var url;
        try {
            url = new URL(href, window.location.href);
        } catch (e) {
            return false;
        }
        if (!/^https?:$/.test(url.protocol)) {
            return false;
        }
        return url.hostname !== window.location.hostname;
    }

    document.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return;
        }
        var target = e.target;
        if (!target || !target.closest) {
            return;
        }
        var link = target.closest('a[href]');
        if (!link) {
            return;
        }
        if (link.hasAttribute('data-no-guard') || link.closest('.lg-mask')) {
            return;
        }
        var href = link.getAttribute('href');
        if (!isExternal(href)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        show(href.trim());
    }, true);
})();
