/*
 * 轩玮导航 - 全站统一页脚（注入式）
 * @package XuWbk
 * @author 轩玮
 * @version 1.0.0
 * @description 页面只需放置 <div id="xuwbk-footer"></div>，页脚内容由本脚本统一注入。
 *              修改页脚只需改本文件与 assets/css/footer.css，无需逐页维护。
 * @contact QQ:6050640 邮箱：6050640@qq.com 网址：www.xuwbk.com
 * @copyright Copyright (c) 2026 by XuWbk.Com, All Rights Reserved.
 */
(function (window, document) {
    'use strict';

    /* 页脚模板，{BASE} 注入时替换为当前页面的资源根目录（兼容子目录页面） */
    var HTML = [
    '    <div class="footer-fav">',
    '    <div class="wrapper footer-fav-top">',
    '    <div class="Onecad_fl site-info">',
    '    <h2><span class="site-title-mobile">轩玮博客</span> <span class="site-domain-mobile">WWW.XUWKB.COM</span></h2>',
    '    <div class="site-p">',
    '    <p>专注优质 IT 与互联网资源分享。轩玮博客自上线以来，始终努力坚持搜集和分享各种网络知识与 IT 科技内容。经过长期积累与更新，网站已逐步发展成涵盖多领域的综合性资源博客，为站长、开发者、运营人员以及普通互联网爱好者提供实用、靠谱、可落地的资源与教程。</p>',
    '    </div>',
    '    </div>',
    '',
    '    <div class="fr site-fav">',
    '    <a class="btn btn-fav btn-orange" href="javascript:;" onclick="alert(\'请按 Ctrl + D 把本站加入收藏夹\')">',
    '    <i class="xw-ico xw-star"></i> 按Ctrl+D收藏本站',
    '    </a>',
    '    </div>',
    '',
    '    <div class="site-girl">',
    '    <div class="girl Onecad_fl">',
    '    <i class="thumb" style="background-image:url(https://img.xuwbk.com/uploads/tup/robot.png)"></i>',
    '    </div>',
    '    <div class="girl-info hide_md">',
    '    <h4>管理员介绍</h4>',
    '    <h4>轩玮博客 专注于精品源码分享</h4>',
    '    </div>',
    '    </div>',
    '    </div>',
    '    </div>',
    '',
    '    <footer id="onecad_new_footer" class="onecad_new_footer">',
    '    <div id="tfbk-footer-new" class="footer">',
    '    <div class="tfbk-footer">',
    '    <div class="wrapper">',
    '    <div class="tfbk-footer-widget-in">',
    '    <section class="widget widget_text">',
    '    <h2 class="widget-title">关于我们</h2>',
    '    <div class="textwidget">',
    '    <p>专注分享优质实用互联网资源，涵盖建站、源码、工具等多类 IT 内容，致力打造专业 IT 博客！</p>',
    '    </div>',
    '    </section>',
    '',
    '    <section class="widget widget_nav_menu widget-menu">',
    '    <h2 class="widget-title">关于我们</h2>',
    '    <ul class="menu">',
    '    <li><a href="https://www.xuwbk.com/protocol" target="_blank" rel="noopener">用户协议</a></li>',
    '    <li><a href="https://www.xuwbk.com/statement" target="_blank" rel="noopener">免责声明</a></li>',
    '    <li><a href="https://www.xuwbk.com/privacy" target="_blank" rel="noopener">隐私政策</a></li>',
    '    <li><a href="https://www.xuwbk.com/map" target="_blank" rel="noopener">站点地图</a></li>',
    '    </ul>',
    '    </section>',
    '',
    '    <section class="widget widget_nav_menu widget-menu">',
    '    <h2 class="widget-title">特色功能</h2>',
    '    <ul class="menu">',
    '    <li><a href="https://www.xuwbk.com/blacklist" target="_blank" rel="noopener">小黑屋</a></li>',
    '    <li><a href="https://www.xuwbk.com/hot" target="_blank" rel="noopener">热门标签</a></li>',
    '    <li><a href="https://www.xuwbk.com/archives" target="_blank" rel="noopener">文章归档</a></li>',
    '    <li><a href="https://www.xuwbk.com/" target="_blank" rel="noopener">本站主题</a></li>',
    '    </ul>',
    '    </section>',
    '',
    '    <section class="widget widget_nav_menu widget-menu">',
    '    <h2 class="widget-title">用户中心</h2>',
    '    <ul class="menu">',
    '    <li><a href="https://www.xuwbk.com/vip" target="_blank" rel="noopener">会员说明</a></li>',
    '    <li><a href="https://www.xuwbk.com/user/auth" target="_blank" rel="noopener">申请认证</a></li>',
    '    <li><a href="https://www.xuwbk.com/order-seach" target="_blank" rel="noopener">订单查询</a></li>',
    '    <li><a href="https://www.xuwbk.com/zanzhu" target="_blank" rel="noopener">赞助发电</a></li>',
    '    </ul>',
    '    </section>',
    '',
    '    <section class="widget widget_custom_html widget-menu">',
    '    <h2 class="widget-title">关注我们</h2>',
    '    <div class="qr-container">',
    '    <!-- 二维码图片请替换为真实图片：./assets/images/footer/weix.png 等 -->',
    '    <div class="qr-item">',
    '    <div class="qr-wrapper">',
    '    <img width="90" height="90" alt="关注公众号" class="qr-img"',
    '    src="{BASE}assets/images/footer/weix.png">',
    '    </div>',
    '    <p class="qr-tips">关注公众号</p>',
    '    </div>',
    '    <div class="qr-item">',
    '    <div class="qr-wrapper">',
    '    <img width="90" height="90" alt="加入群聊" class="qr-img"',
    '    src="{BASE}assets/images/footer/qq.png">',
    '    </div>',
    '    <p class="qr-tips">加入群聊</p>',
    '    </div>',
    '    </div>',
    '    </section>',
    '    </div>',
    '    </div>',
    '    </div>',
    '',
    '    <div class="tfbk-footer-nav">',
    '    <div class="wrapper">',
    '    <div class="footer-links">',
    '    <div class="link-content">',
    '    <span class="link-heading">友情链接：</span>',
    '    <div class="link-items">',
    '    <a href="https://www.xuwbk.com" title="探索建站技术，分享专业见解IT博客" target="_blank" rel="noopener">轩玮博客</a>',
    '    <a href="https://www.wmr7.com" title="阿七源码" target="_blank" rel="noopener">阿七源码</a>',
    '    <a href="https://pan.xuwbk.com" title="轩玮网盘" target="_blank" rel="noopener">轩玮网盘</a>',
    '    <a href="https://tool.xuwbk.com" title="轩玮工具" target="_blank" rel="noopener">轩玮工具</a>',
    '    <a href="https://host.xuwbk.com" title="轩玮监测" target="_blank" rel="noopener">轩玮监测</a>',
    '    <!-- 管理员批准后自动追加的友链（数据来自 assets/js/friendlink.js） -->',
    '    <span data-friendlink-approved="text"></span>',
    '    </div>',
    '    </div>',
    '    <a href="{BASE}links.html" class="apply-link">申请友链</a>',
    '    </div>',
    '',
    '    <div class="footer-bottom">',
    '    <div class="footer-bottom-container">',
    '    <div class="foot-copyright">',
    '    © 2026 轩玮博客. Xuwbk.Com All Rights Reserved.',
    '    </div>',
    '    <div class="footer-bottom-right">',
    '    <a rel="nofollow" target="_blank" href="http://beian.miit.gov.cn/" class="icp-info">滇ICP备20001185号-88</a>',
    '    </div>',
    '    </div>',
    '    </div>',
    '    </div>',
    '    </div>',
    '    </div>',
    '    </footer>',
].join('\n');

    function baseUrl() {
        var script = document.querySelector('script[src$="assets/js/footer.js"]');
        if (!script) {
            return '';
        }
        var src = script.getAttribute('src');
        var i = src.indexOf('assets/js/footer.js');
        return i < 0 ? '' : src.slice(0, i);
    }

    function html() {
        return String(HTML).replace(/\{BASE\}/g, baseUrl());
    }

    function render() {
        var box = document.getElementById('xuwbk-footer');
        if (!box || box.getAttribute('data-rendered')) {
            return false;
        }
        box.innerHTML = html();
        box.setAttribute('data-rendered', '1');
        return true;
    }

    function boot() {
        if (!render()) {
            return;
        }
        /* 页脚内含动态友链容器：friendlink.js 已初始化时补渲染一次 */
        try {
            if (window.XuWbkFriendLink && window.XuWbkFriendLink.renderApproved) {
                window.XuWbkFriendLink.renderApproved();
            }
        } catch (e) { }
    }

    window.XuWbkFooter = { render: render, boot: boot, baseUrl: baseUrl };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})(window, document);
