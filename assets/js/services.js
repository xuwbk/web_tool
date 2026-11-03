/* 服务资源逻辑：由四页共用的内联 IIFE 抽取而成，避免重复维护。
   数据：GET data/services.json（已发布快照，同源静态）；保存/删除写本地并自动导出 services.json 供提交 Git。 */
(function(){
  var PWD = 'xuwbk.com';
  var KEY = 'xuwbk_services_v1';
  var SEED = [{"id":"s1","name":"彩虹云主机","type":"主机资源","url":"mblog.xuwbk.com","status":"正常","addDate":"2026/05/01","renewDate":"2027/05/01","note":"http://mblog.xuw...","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"彩虹云","email":""}},{"id":"s2","name":"profreehost","type":"主机资源","url":"xuanwei.cn.mt/","status":"正常","addDate":"2026/06/15","renewDate":"2034/02/01","note":"Free Web Hostin...","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"ProFreeHost","email":""}},{"id":"s3","name":"InfinityFree","type":"主机资源","url":"xuwbk.gt.tc","status":"正常","addDate":"2026/08/03","renewDate":"2034/01/03","note":"-","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"InfinityFree","email":"admin@wm7.com"}},{"id":"s4","name":"alwaysdata","type":"主机资源","url":"xuwbk.alwaysdata.net","status":"正常","addDate":"2026/08/04","renewDate":"2099/08/04","note":"-","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"alwaysdata","email":""}},{"id":"s5","name":"lima-city","type":"主机资源","url":"xuwbk.4lima.de/","status":"正常","addDate":"2026/08/14","renewDate":"2026/10/31","note":"-","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"lima-city","email":""}},{"id":"s6","name":"phpkj空间","type":"主机资源","url":"xuwbk.dzol.vip/","status":"正常","addDate":"2026/09/07","renewDate":"2027/03/07","note":"到期前30天可续期","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"phpkj","email":""}},{"id":"s7","name":"byethost老牌空间","type":"主机资源","url":"xuwbk.byethost9.com/","status":"正常","addDate":"2026/09/09","renewDate":"2034/06/09","note":"主域名: xuwbk.by...","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"ByetHost","email":""}},{"id":"s8","name":"成都","type":"VPS资源","url":"43.136.130.233/","status":"正常","addDate":"2026/09/15","renewDate":"2027/09/10","note":"-","detail":{"system":"Linux","cpu":"1核","memory":"2GB","disk":"40GB","bandwidth":"100Mbps","traffic":"不限","ip":"1","defense":"基础","virt":"KVM","dc":"腾讯云","panel":"控制台","backup":"快照","os":"Linux","price":"约 ¥50/年","port":"22/80","other":"-","provider":"腾讯云","email":"-"}},{"id":"s9","name":"意大利BotKeep","type":"主机资源","url":"xuwbk.bot-keep.xyz/","status":"正常","addDate":"2026/10/16","renewDate":"2039/12/31","note":"-","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"BotKeep","email":""}},{"id":"s10","name":"荷兰DeployBase","type":"主机资源","url":"xuwbk.cc.dl/","status":"失效","addDate":"2026/10/16","renewDate":"2039/12/31","note":"-","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"基础","domainType":"子域名/可绑定域名","bandwidth":"视服务商而定","mail":"视服务商而定","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"视服务商而定","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"DeployBase","email":""}},{"id":"s11","name":"免费域名","type":"域名资源","url":"xuwbk.lovie.me/","status":"正常","addDate":"2026/10/18","renewDate":"2027/10/18","note":"-","detail":{"suffix":".me","registrar":"Lovie","regPrice":"免费","renewPrice":"免费","transferIn":"免费","privacy":"支持","dns":"支持","transferable":"可转移","realname":"不需要","icp":"不需要","regYears":"1年","regDate":"2026/10/18","status":"正常","provider":"Lovie","email":"-"}},{"id":"def_host_1","name":"彩虹云主机","type":"主机资源","url":"mblog.xuwbk.com","status":"正常","addDate":"2026/05/01","renewDate":"2027/05/01","note":"免费空间示例（默认数据）","detail":{"space":"1 GB","ad":"视服务商而定","selfad":"允许","upload":"FTP/浏览器","editor":"在线文件管理器","domainType":"子域名/可绑定域名","bandwidth":"不限","mail":"支持","db":"MySQL","stat":"有","pwd":"有","speed":"即时","fileLimit":"无","inactive":"30 天","security":"基本防护","script":"PHP · MySQL","provider":"彩虹云","email":""}},{"id":"def_vps_1","name":"成都云服务器","type":"VPS资源","url":"www.xuwbk-vps.com","status":"正常","addDate":"2026/06/01","renewDate":"2027/06/01","note":"KVM 云服务器示例（默认数据）","detail":{"space":"20 GB+","ad":"无广告","selfad":"允许","upload":"SSH/SFTP","editor":"高级（完全控制）","domainType":"独立IP / 可绑定域名","bandwidth":"1 TB+/月","mail":"可自建","db":"全部支持","stat":"可自建","pwd":"有 (SSH Key)","speed":"即时/数分钟","fileLimit":"无限制","inactive":"不限","security":"自行配置防火墙","script":"全部支持","provider":"示例云","email":""}},{"id":"def_dom_1","name":"免费域名 .me","type":"域名资源","url":"xuwbk.lovie.me","status":"正常","addDate":"2026/10/18","renewDate":"2027/10/18","note":"-","detail":{"suffix":".me","registrar":"Lovie","regPrice":"免费","renewPrice":"免费","transferIn":"免费","privacy":"支持","dns":"支持","transferable":"可转移","realname":"不需要","icp":"不需要","regYears":"1年","regDate":"2026/10/18","status":"正常","provider":"Lovie","email":"-"}},{"id":"def_other_1","name":"在线配色工具","type":"其他资源","url":"www.xuwbk-tools.com","status":"正常","addDate":"2026/03/01","renewDate":"2027/03/01","note":"常用在线工具示例（默认数据）","detail":{"rtype":"在线工具","usage":"配色","access":"网页","valid":"长期","limit":"无","link":"-","note":"常用","provider":"-","email":""}}];
  var TYPE_FIELDS = {
    '主机资源':[
      {k:'space',label:'空间'},{k:'ad',label:'广告'},{k:'selfad',label:'自有广告',type:'select',opts:['允许','不允许']},
      {k:'upload',label:'上传方式'},{k:'editor',label:'编辑端'},{k:'domainType',label:'域名类型'},
      {k:'bandwidth',label:'带宽'},{k:'mail',label:'邮箱'},{k:'db',label:'数据库'},
      {k:'stat',label:'统计',type:'select',opts:['有','无','视服务商而定']},
      {k:'pwd',label:'密码保护'},{k:'speed',label:'激活速度'},{k:'fileLimit',label:'文件限制'},
      {k:'inactive',label:'不活跃'},{k:'security',label:'安全'},{k:'script',label:'脚本'}
    ],
    'VPS资源':[
      {k:'space',label:'空间'},{k:'ad',label:'广告'},{k:'selfad',label:'自有广告',type:'select',opts:['允许','不允许']},
      {k:'upload',label:'上传方式'},{k:'editor',label:'编辑端'},{k:'domainType',label:'域名类型'},
      {k:'bandwidth',label:'带宽'},{k:'mail',label:'邮箱'},{k:'db',label:'数据库'},
      {k:'stat',label:'统计',type:'select',opts:['有','无','视服务商而定']},
      {k:'pwd',label:'密码保护'},{k:'speed',label:'激活速度'},{k:'fileLimit',label:'文件限制'},
      {k:'inactive',label:'不活跃'},{k:'security',label:'安全'},{k:'script',label:'脚本'}
    ],
    '域名资源':[
      {k:'suffix',label:'后缀'},{k:'registrar',label:'注册商'},{k:'regPrice',label:'注册价'},{k:'renewPrice',label:'续费价格'},
      {k:'transferIn',label:'转入价'},{k:'privacy',label:'隐私保护',type:'select',opts:['支持','不支持']},
      {k:'dns',label:'DNS',type:'select',opts:['支持','不支持']},{k:'transferable',label:'可转移',type:'select',opts:['可转移','不可转移']},
      {k:'realname',label:'实名',type:'select',opts:['需要','不需要']},{k:'icp',label:'备案',type:'select',opts:['需要','不需要']},
      {k:'regYears',label:'注册年限'},{k:'regDate',label:'注册时间'},{k:'status',label:'状态'}
    ],
    '其他资源':[
      {k:'rtype',label:'资源类型'},{k:'usage',label:'用途'},{k:'access',label:'访问方式'},{k:'valid',label:'有效期'},
      {k:'limit',label:'限制'},{k:'link',label:'链接'},{k:'note',label:'备注'}
    ]
  };
  var DEFAULTS = {
    '主机资源': {space:'1 GB',ad:'视服务商而定',selfad:'允许',upload:'FTP/浏览器',editor:'基础',domainType:'子域名/可绑定域名',bandwidth:'视服务商而定',mail:'视服务商而定',db:'MySQL',stat:'有',pwd:'有',speed:'即时',fileLimit:'视服务商而定',inactive:'30 天',security:'',script:''},
    'VPS资源': {space:'20 GB+',ad:'无广告',selfad:'允许',upload:'SSH/SFTP',editor:'高级（完全控制）',domainType:'独立IP / 可绑定域名',bandwidth:'1 TB+/月',mail:'可自建',db:'全部支持',stat:'可自建',pwd:'有 (SSH Key)',speed:'即时/数分钟',fileLimit:'无限制',inactive:'不限',security:'自行配置防火墙',script:'全部支持'},
    '域名资源': {suffix:'.me',registrar:'Lovie',regPrice:'免费',renewPrice:'免费',transferIn:'免费',privacy:'支持',dns:'支持',transferable:'可转移',realname:'不需要',icp:'不需要',regYears:'1年',regDate:'2026/10/18',status:'正常'},
    '其他资源': {rtype:'在线工具',usage:'配色',access:'网页',valid:'长期',limit:'无',link:'-',note:'常用'}
  };
  var DEFAULTS_TOP = {
    '主机资源': {},
    'VPS资源': {},
    '域名资源': {provider:'Lovie',email:'-',renewDate:'2027/10/18',note:'-'},
    '其他资源': {provider:'-',email:'-',renewDate:'2027/03/01',note:'常用在线工具示例（默认数据）'}
  };
  function applyTopDefaults(f, type){
    var t=DEFAULTS_TOP[type]||{};
    for(var k in t){ var el=f.elements[k]; if(!el) continue; if(el.value && el.value.trim()!=='') continue;
      var v=t[k]; if(k==='renewDate'||k==='addDate') v=(v||'').replace(/\//g,'-'); el.value=v; }
  }
  function q(id){return document.getElementById(id);}

  ['pwdModal','formModal','submitModal','friendlinkModal','flSuccessCenter'].forEach(function(id){var el=q(id);if(el && el.parentNode!==document.body){document.body.appendChild(el);}});

  function showSuccess(msg,type){
    var el=q('flSuccessCenter'); if(!el) return;
    el.textContent=msg;
    el.className='fl-success-center show'+(type==='err'?' err':'');
    clearTimeout(window.__flT);
    window.__flT=setTimeout(function(){el.className='fl-success-center';},2400);
  }
  function openOverlay(id){var el=q(id);if(el){el.classList.add('open');}}
  function closeOverlay(id){var el=q(id);if(el){el.classList.remove('open');}}
  function pad(n){return n<10?'0'+n:''+n;}
  function today(){var d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
  function fmtDisp(v){return v?v.replace(/-/g,'/'):'';}
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  /* 服务商：支持「网址」或「显示名|网址」；只填网址时自动取主域名作显示名（www.lima-city.de → lima-city） */
  function provParse(v){
    var s=String(v||'').trim(); if(!s) return { name:'', url:'' };
    var name='', url=s, p=s.indexOf('|');
    if(p>-1){ name=s.slice(0,p).trim(); url=s.slice(p+1).trim(); }
    if(url && !/^https?:\/\//i.test(url)){ url=/^[a-z0-9-]+(\.[a-z0-9-]+)+([\/?#][^\s]*)?$/i.test(url)? 'https://'+url : ''; }
    if(!name && url){
      var host=url.replace(/^https?:\/\//i,'').split(/[\/?#]/)[0].replace(/^www\./i,'');
      var parts=host.split('.');
      name=parts.length===2? parts[0] : host;
    }
    if(!name) name=s;
    return { name:name, url:url };
  }
  function provHtml(v){ var p=provParse(v); if(!p.name) return '-'; return p.url? '<a href="'+esc(p.url)+'" target="_blank" rel="noopener">'+esc(p.name)+'</a>' : esc(p.name); }
  function calcDays(renew){ if(!renew) return ''; var d=new Date(renew.replace(/-/g,'/')); if(isNaN(d)) return ''; var diff=Math.ceil((d-new Date())/86400000); return diff>=0? diff+' 天' : '已过期'; }
  function typeCls(t){ return t==='VPS资源'?'vps': t==='域名资源'?'dom': t==='其他资源'?'other':'free'; }
  var MEM=null;
  /* ===== 统一存储层：localStorage 优先，Cookie 兜底 =====
     某些浏览器 / 无痕 / 被嵌在受限 iframe 时 localStorage 会被禁用，
     导致"改了又没保存、无痕恢复默认"。这里在 localStorage 不可用时自动用 Cookie 兜底，保证数据能落盘。 */
  function _ckEsc(s){ try{ return encodeURIComponent(s); }catch(e){ try{ return escape(s); }catch(e2){ return ''; } } }
  function _ckUn(s){ try{ return decodeURIComponent(s); }catch(e){ try{ return unescape(s); }catch(e2){ return ''; } } }
  function _ckPut(name,val){ try{ var d=new Date(Date.now()+400*864e5).toUTCString(); document.cookie=name+'='+val+';expires='+d+';path=/;SameSite=Lax'; }catch(e){} }
  function _ckGet(name){ try{ var m=document.cookie.match(new RegExp('(?:^|; )'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'=([^;]*)')); return m?_ckUn(m[1]):''; }catch(e){ return ''; } }
  function _ckSet(k,v){ try{ var enc=_ckEsc(v); var pre='xw1_'+k.replace(/[^a-zA-Z0-9_]/g,'_'); var n=Math.ceil(enc.length/3500), i; _ckPut(pre+'_n', String(n)); for(i=0;i<n;i++){ _ckPut(pre+'_'+i, enc.slice(i*3500,(i+1)*3500)); } }catch(e){} }
  function _ckDel(k){ try{ var pre='xw1_'+k.replace(/[^a-zA-Z0-9_]/g,'_'); var n=parseInt(_ckGet(pre+'_n')||'0',10), i; if(n){ for(i=0;i<n;i++){ _ckPut(pre+'_'+i,''); } } _ckPut(pre+'_n',''); }catch(e){} }
  function xwGet(k){ var v=null; try{ v=localStorage.getItem(k); }catch(e){ v=null; } if(v!==null && v!==undefined) return v; var c=_ckGet(k); return c?c:null; }
  function xwSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} _ckSet(k,v); }
  function xwDel(k){ try{ localStorage.removeItem(k); }catch(e){} _ckDel(k); }
  function xwAvail(){ try{ var t='__xw_store_test__'; localStorage.setItem(t,'1'); localStorage.removeItem(t); return true; }catch(e){} try{ _ckPut('__xw_ck_test__','1'); var ok=_ckGet('__xw_ck_test__')==='1'; _ckPut('__xw_ck_test__',''); return ok; }catch(e){ return false; } }
  function load(){
    var raw=xwGet(KEY);
    var seeded=xwGet(KEY+'_seeded')==='1';
    if(raw===null){
      if(MEM) return MEM;
      var seed=JSON.parse(JSON.stringify(SEED));
      MEM=seed; xwSet(KEY, JSON.stringify(seed)); xwSet(KEY+'_seeded','1');
      return seed;
    }
    var base=[]; try{ base=JSON.parse(raw)||[]; }catch(e){ base=[]; }
    if(!seeded){
      var seen={}; base.forEach(function(x){ seen[x.id]=1; });
      JSON.parse(JSON.stringify(SEED)).forEach(function(x){ if(!seen[x.id]) base.push(x); });
      MEM=base; xwSet(KEY, JSON.stringify(base)); xwSet(KEY+'_seeded','1');
    }
    return base;
  }
  function persist(list){ MEM=list; xwSet(KEY, JSON.stringify(list)); }
  function find(id){ var l=load(); for(var i=0;i<l.length;i++){ if(l[i].id===id) return l[i]; } return null; }
  function extUrl(u){ u=String(u||'').trim(); if(!u) return ''; if(!/^https?:\/\//i.test(u)) u='https://'+u; return u; }

  var curType='', curStatus='', curKw='';
  function filtered(){ return load().filter(function(it){
    if(curType && it.type!==curType) return false;
    if(curStatus && it.status!==curStatus) return false;
    if(curKw && (it.name+' '+it.url).toLowerCase().indexOf(curKw)<0) return false;
    return true; }); }

  /* 把服务后台管理的「主机 / 域名 / VPS / 其他资源」渲染到首页对应导航区块 */
  function renderResourceCards(){
    if(!document.querySelectorAll) return;
    var cats=['主机资源','域名资源','VPS资源','其他资源'];
    var items=load(); if(!items||!items.length) return;
    var boxes=document.querySelectorAll('[data-nav-category]');
    if(!boxes||!boxes.length) return;
    Array.prototype.forEach.call(boxes, function(box){
      var cat=box.getAttribute('data-nav-category');
      if(cats.indexOf(cat)<0) return;
      var olds=box.querySelectorAll('[data-svc-card]');
      Array.prototype.forEach.call(olds, function(n){ if(n.parentNode) n.parentNode.removeChild(n); });
      var list=items.filter(function(it){ return it && it.type===cat; });
      list.sort(function(a,b){ var x=(a.addDate||'').replace(/\//g,'-'), y=(b.addDate||'').replace(/\//g,'-'); return x<y?1:(x>y?-1:0); });
      list.forEach(function(it){ box.insertAdjacentHTML('beforeend', svcCardHtml(it)); });
    });
  }
  function svcCardHtml(it){
    var raw=String(it.url||'');
    var url=esc(extUrl(raw)||'#');              /* 卡牌链接 = 服务商链接（站点地址/域名） */
    var name=esc(it.name||'未命名');
    /* 图标：优先自定义「图标地址」，其次按域名取 favicon，最后用本地默认图标（避免强依赖外部服务） */
    var fav;
    if(it.icon){ fav=esc(it.icon); }
    else {
      var host=String(raw||'').replace(/^https?:\/\//i,'').split('/')[0];
      fav = host ? ('https://www.google.com/s2/favicons?sz=64&domain='+encodeURIComponent(host)) : 'assets/images/default-icon.webp';
    }
    var desc=esc(it.note||'');                   /* 卡牌副标题 = 备注 */
    return '<div class="url-card col-6 col-sm-6 col-md-4 col-xl-5a col-xxl-6a" data-svc-card="'+(it.id||'')+'">'+
      '<div class="url-body default">'+
        '<a href="'+url+'" target="_blank" data-id="" data-url="'+url+'" class="card no-c mb-4" data-toggle="tooltip" data-placement="bottom" data-original-title="'+desc+'">'+
          '<div class="card-body">'+
            '<div class="url-content d-flex align-items-center">'+
              '<div class="url-img mr-2 d-flex align-items-center justify-content-center">'+
                '<img class="lazy" src="'+fav+'" data-src="'+fav+'" onerror="javascript:this.src=\'assets/images/default-icon.webp\';this.onerror=null;" alt="'+name+'">'+
              '</div>'+
              '<div class="url-info flex-fill">'+
                '<div class="text-sm overflowClip_1"><strong>'+name+'</strong></div>'+
                '<p class="overflowClip_1 m-0 text-muted text-xs">'+desc+'</p>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</a>'+
        '<a href="'+url+'" class="togo text-center text-muted is-views" data-id="" data-toggle="tooltip" data-placement="right" title="直达" rel="nofollow"><i class="iconfont icon-goto"></i></a>'+
      '</div>'+
    '</div>';
  }

  function render(){
    renderResourceCards();
    var tb=q('slBody'); if(!tb) return; tb.innerHTML='';
    filtered().forEach(function(it){
      var days=calcDays(it.renewDate);
      var ok=it.status!=='失效';
      var tr=document.createElement('tr');
      tr.className='sl-data'; tr.setAttribute('data-id', it.id);
      var urlHtml = it.url ? '<a class="sl-url" href="'+esc(extUrl(it.url))+'" target="_blank" rel="noopener">'+esc(it.url)+'</a>' : '-';
      tr.innerHTML='<td><input type="checkbox"></td>'+
        '<td><a href="javascript:" class="sl-name">'+esc(it.name)+'</a></td>'+
        '<td><span class="sl-badge '+typeCls(it.type)+'">'+esc(it.type)+'</span></td>'+
        '<td>'+urlHtml+'</td>'+
        '<td><span class="sl-pill '+(ok?'ok':'bad')+'">'+(ok?'正常':'失效')+'</span></td>'+
        '<td>'+esc(it.addDate)+'</td>'+
        '<td>'+esc(it.renewDate)+'</td>'+
        '<td class="sl-days">'+esc(days)+'</td>'+
        '<td class="sl-note">'+esc(it.note||'-')+'</td>'+
        '<td><div class="sl-actions">'+
          '<button type="button" data-act="view" title="查看">◎</button>'+
          '<button type="button" data-act="edit" title="编辑">✎</button>'+
          '<button type="button" data-act="refresh" title="刷新">⟳</button>'+
          '<button type="button" data-act="delete" title="删除">✕</button>'+
        '</div></td>';
      tb.appendChild(tr);
      var dr=document.createElement('tr');
      dr.className='sl-detail'; dr.setAttribute('data-detail', it.id);
      var d=it.detail||{};
      var statusPill='<span class="sl-pill '+(ok?'ok':'bad')+'">'+(ok?'正常':'失效')+'</span>';
      var typeLink='<a href="javascript:" class="sl-type-link" data-type="'+esc(it.type)+'">'+esc(it.type)+'</a>';
      var provLink=provHtml(d.provider);
      var rows=[['状态', statusPill],['类型', typeLink],['地址/域名', urlHtml],['服务商', provLink],['关联邮箱', esc(d.email||'-')],['到期', esc((days? days+'后':'')+' ('+(it.renewDate||'-')+')')],['备注', esc(it.note||'-')]];
      (TYPE_FIELDS[it.type]||[]).forEach(function(f){ rows.push([f.label, esc(d[f.k]||'-')]); });
      dr.innerHTML='<td colspan="10"><div class="sl-detail-inner">'+rows.map(function(r){return '<div class="sl-detail-item">'+r[0]+'<b>'+r[1]+'</b></div>';}).join('')+'</div></td>';
      tb.appendChild(dr);
    });
  }

  function toggleDetail(id){
    var dr=document.querySelector('tr.sl-detail[data-detail="'+id+'"]'); if(!dr) return;
    var willOpen=!dr.classList.contains('open');
    Array.prototype.forEach.call(document.querySelectorAll('#slBody tr.sl-detail.open'),function(x){x.classList.remove('open');});
    if(willOpen){ dr.classList.add('open'); }
  }

  var body=q('slBody');
  if(body){ body.addEventListener('click', function(e){
    var t=e.target;
    var typeLink=t.closest? t.closest('a.sl-type-link') : null;
    if(typeLink){ e.preventDefault(); e.stopPropagation(); var ty=typeLink.getAttribute('data-type')||''; curType=ty; if(q('sl-type')) q('sl-type').value=ty; render(); return; }
    var btn=t.closest? t.closest('button[data-act]') : null;
    var tr=t.closest? t.closest('tr.sl-data') : null;
    var id=tr? tr.getAttribute('data-id') : null;
    if(btn){
      e.preventDefault(); e.stopPropagation();
      var act=btn.getAttribute('data-act');
      if(act==='view'){ toggleDetail(id); }
      else if(act==='edit'){ var it=find(id); if(it){ askPassword('编辑服务', function(){ openForm(it); }); } }
      else if(act==='refresh'){ render(); showSuccess('已刷新'); }
      else if(act==='delete'){ var del=find(id); if(del){ askPassword('删除服务', function(){ doDelete(id); }); } }
      return;
    }
    var nm=t.closest? t.closest('a.sl-name') : null;
    if(nm){ var row=nm.closest('tr.sl-data'); if(row){ e.preventDefault(); toggleDetail(row.getAttribute('data-id')); } return; }
  });}

  function doDelete(id){
    var it=find(id); if(!it) return;
    if(!window.confirm('确定删除服务「'+it.name+'」吗？此操作不可恢复。')) return;
    persist(load().filter(function(x){return x.id!==id;}));
    markDeleted(id);
    render(); showSuccess('已删除');
    pushToServer(load());
  }

  var pendingFn=null;
  function askPassword(title, fn){
    if(!q('pwdModal')) return;
    q('pwdTitle').textContent=title||'添加服务';
    q('pwdInput').value='';
    pendingFn=fn||null;
    openOverlay('pwdModal');
    setTimeout(function(){ if(q('pwdInput')) q('pwdInput').focus(); },60);
  }
  if(q('pwdOk')){ q('pwdOk').addEventListener('click', function(){
    if(q('pwdInput').value!==PWD){ showSuccess('密码错误，请重试','err'); return; }
    closeOverlay('pwdModal');
    var fn=pendingFn; pendingFn=null; if(fn) fn();
  });}
  if(q('pwdCancel')){ q('pwdCancel').addEventListener('click', function(){ pendingFn=null; closeOverlay('pwdModal'); }); }
  if(q('pwdInput')){ q('pwdInput').addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); if(q('pwdOk')) q('pwdOk').click(); } }); }

  function buildFeature(type, vals){
    var defs=TYPE_FIELDS[type]||[];
    var html='<div class="sl-form-grid">';
    defs.forEach(function(f){
      var v=(vals&&vals[f.k]!=null)?vals[f.k]:'';
      if(f.type==='select'){
        html+='<div class="sl-field"><label>'+f.label+'</label><select class="form-control" name="'+f.k+'">'+f.opts.map(function(o){return '<option value="'+o+'"'+(String(o)===String(v)?' selected':'')+'>'+o+'</option>';}).join('')+'</select></div>';
      } else {
        html+='<div class="sl-field"><label>'+f.label+'</label><input class="form-control" name="'+f.k+'" value="'+esc(v)+'"></div>';
      }
    });
    html+='</div>';
    return html;
  }
  function collectFeature(){
    var obj={}; var box=q('sl-feature-fields'); if(!box) return obj;
    Array.prototype.forEach.call(box.querySelectorAll('[name]'),function(el){ obj[el.name]=el.value; });
    return obj;
  }

  function openForm(item){
    var f=q('serviceForm'); if(!f) return;
    f.reset();
    q('formTitle').textContent = item? '编辑服务' : '添加服务';
    f.elements['id'].value = item? item.id : '';
    var type = item? item.type : '主机资源';
    if(item){
      f.elements['name'].value=item.name||'';
      f.elements['type'].value=type;
      f.elements['url'].value=item.url||'';
      f.elements['addDate'].value=(item.addDate||'').replace(/\//g,'-')||today();
      f.elements['renewDate'].value=(item.renewDate||'').replace(/\//g,'-');
      f.elements['note'].value=item.note||'';
      if(f.elements['icon']) f.elements['icon'].value=item.icon||'';
      var d=item.detail||{};
      f.elements['provider'].value=d.provider||'';
      f.elements['email'].value=d.email||'';
    } else {
      f.elements['addDate'].value=today();
      f.elements['port'].value='80';
    }
    if(q('sl-feature-fields')){ q('sl-feature-fields').innerHTML=buildFeature(type, item? (item.detail||{}) : (DEFAULTS[type]||{})); }
    if(!item) applyTopDefaults(f, type);
    openOverlay('formModal');
  }

  var typeSel=(q('serviceForm')? q('serviceForm').elements['type']:null);
  if(typeSel){ typeSel.addEventListener('change', function(){
    var f=q('serviceForm'); var isEdit=!!f.elements['id'].value; var type=this.value;
    var vals=collectFeature(); var base=isEdit?{}:(DEFAULTS[type]||{}); var merged={};
    for(var k in base) merged[k]=base[k]; for(var k in vals) merged[k]=vals[k];
    if(q('sl-feature-fields')) q('sl-feature-fields').innerHTML=buildFeature(type, merged);
    if(!isEdit) applyTopDefaults(f, type);
  }); }

  if(q('sl-add-btn')){ q('sl-add-btn').addEventListener('click', function(){ askPassword('添加服务', function(){ openForm(null); }); }); }

  // ===== 资源列表工具栏：全部检测 / 导出 / 导入 / 删除无效 =====
  function detectAll(){
    var l=load();
    l.forEach(function(it){ it.status = /已过期/.test(calcDays(it.renewDate)) ? '失效' : '正常'; });
    persist(l); render();
    var bad=l.filter(function(x){return x.status==='失效';}).length;
    showSuccess('检测完成：正常 '+(l.length-bad)+' / 失效 '+bad);
  }
  if(q('sl-check-all')){ q('sl-check-all').addEventListener('click', detectAll); }
  if(q('sl-export')){ q('sl-export').addEventListener('click', function(){
    var data=JSON.stringify(load(), null, 2);
    var blob=new Blob([data], {type:'application/json'});
    var a=document.createElement('a'); var d=new Date();
    a.href=URL.createObjectURL(blob);
    a.download='services.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1500);
    showSuccess('已导出 '+load().length+' 条数据');
  }); }
  var importInput=null;
  if(q('sl-import')){ q('sl-import').addEventListener('click', function(){
    if(!importInput){
      importInput=document.createElement('input'); importInput.type='file'; importInput.accept='application/json,.json'; importInput.style.display='none'; document.body.appendChild(importInput);
      importInput.addEventListener('change', function(){
        var file=this.files&&this.files[0]; if(!file) return;
        var rd=new FileReader();
        rd.onload=function(){
          try{
            var arr=JSON.parse(rd.result);
            if(!Array.isArray(arr)) throw new Error('not array');
            var map={}; load().forEach(function(x){ map[x.id]=x; });
            var added=0, updated=0;
            arr.forEach(function(x){ if(!x||!x.id||!x.name) return; if(map[x.id]){ updated++; } else { added++; } map[x.id]=x; });
            var merged=Object.keys(map).map(function(k){return map[k];});
            persist(merged); clearDeleted(); render();
            showSuccess('导入完成：新增 '+added+' / 更新 '+updated);
          }catch(err){ showSuccess('导入失败：请选择 JSON 数组文件','err'); }
        };
        rd.readAsText(file); this.value='';
      });
    }
    importInput.click();
  }); }
  function isInvalid(it){ return it.status==='失效' || /已过期/.test(calcDays(it.renewDate)); }
  if(q('sl-del-invalid')){ q('sl-del-invalid').addEventListener('click', function(){
    askPassword('删除无效服务', function(){
      var l=load(); var bad=l.filter(isInvalid);
      if(!bad.length){ showSuccess('没有无效记录'); return; }
      if(!window.confirm('确定删除 '+bad.length+' 条无效（失效/已过期）记录吗？此操作不可恢复。')) return;
      var gone=bad.map(function(x){return x.id;});
      persist(l.filter(function(x){return !isInvalid(x);}));
      gone.forEach(markDeleted);
      render();
      showSuccess('已删除 '+bad.length+' 条无效记录');
    });
  }); }
  if(q('formReset')){ q('formReset').addEventListener('click', function(){
    var f=q('serviceForm'); var id=f.elements['id'].value;
    if(id){ var it=find(id); if(it) openForm(it); } else { f.reset(); f.elements['addDate'].value=today(); f.elements['port'].value='80'; if(q('sl-feature-fields')) q('sl-feature-fields').innerHTML=buildFeature('主机资源', DEFAULTS['主机资源']||{}); applyTopDefaults(f, '主机资源'); }
  });}
  if(q('detailToggle')){ q('detailToggle').addEventListener('click', function(){ var sec=this.parentNode; sec.classList.toggle('collapsed'); var t=sec.querySelector('.sl-toggle'); if(t) t.textContent=sec.classList.contains('collapsed')?'展开':'收起'; }); }

  if(q('serviceForm')){ q('serviceForm').addEventListener('submit', function(e){
    e.preventDefault();
    var f=this;
    var name=f.elements['name'].value.trim();
    var type=f.elements['type'].value;
    var url=f.elements['url'].value.trim();
    var renew=f.elements['renewDate'].value;
    if(!name||!type||!url||!renew){ showSuccess('请填写服务名称、类型、地址和续费时间','err'); return; }
    var id=f.elements['id'].value;
    var detail={ provider:f.elements['provider'].value.trim(), email:f.elements['email'].value.trim() };
    var box=q('sl-feature-fields');
    Array.prototype.forEach.call(box.querySelectorAll('[name]'),function(el){ detail[el.name]=el.value.trim(); });
    var item={ id:id||('s'+Date.now()), name:name, type:type, url:url, status:'正常',
      addDate:fmtDisp(f.elements['addDate'].value)||fmtDisp(today()),
      renewDate:fmtDisp(renew), note:f.elements['note'].value.trim(),
      icon:(f.elements['icon']?f.elements['icon'].value.trim():''), detail:detail };
    if(id){ var old=find(id); if(old){ item.status=old.status||'正常'; } var list=load(); for(var i=0;i<list.length;i++){ if(list[i].id===id){ list[i]=item; break; } } persist(list); }
    else { var l2=load(); l2.push(item); persist(l2); }
    render(); closeOverlay('formModal'); showSuccess(id?'已保存修改':'已添加服务');
    pushToServer(load());
  });}

  if(q('sl-type')){ q('sl-type').addEventListener('change', function(){ curType=this.value; render(); }); }
  if(q('sl-status')){ q('sl-status').addEventListener('change', function(){ curStatus=this.value; render(); }); }
  if(q('sl-search')){ q('sl-search').addEventListener('input', function(){ curKw=this.value.toLowerCase().trim(); render(); }); }

  var navSL=q('nav-service-list');
  if(navSL){ navSL.addEventListener('click', function(e){ e.preventDefault(); render(); q('serviceListPanel').classList.add('open'); document.body.style.overflow='hidden'; }); }
  if(q('sl-close')){ q('sl-close').addEventListener('click', function(){ q('serviceListPanel').classList.remove('open'); document.body.style.overflow=''; }); }

  Array.prototype.forEach.call(document.querySelectorAll('.js-open-submit'),function(a){ a.addEventListener('click',function(e){ e.preventDefault(); openOverlay('submitModal'); }); });
  Array.prototype.forEach.call(document.querySelectorAll('.js-open-friendlink'),function(a){ a.addEventListener('click',function(e){ e.preventDefault(); openOverlay('friendlinkModal'); }); });
  Array.prototype.forEach.call(document.querySelectorAll('[data-fl-close]'),function(b){ b.addEventListener('click',function(){ var ov=b.closest('.fl-overlay'); if(ov) ov.classList.remove('open'); }); });
  Array.prototype.forEach.call(document.querySelectorAll('.fl-overlay'),function(ov){ ov.addEventListener('click',function(e){ if(e.target===ov) ov.classList.remove('open'); }); });

  if(q('submitFormInline')){ q('submitFormInline').addEventListener('submit', function(e){
    e.preventDefault(); var f=this;
    var n=f.elements['name'].value.trim(), u=f.elements['url'].value.trim(), d=f.elements['desc'].value.trim(),
        c=f.elements['contact'].value.trim(), ic=f.elements['icon'].value.trim(), cat=f.elements['category'].value;
    if(!n||!u||!d){ showSuccess('请填写网站名称、地址和描述','err'); return; }
    if(window.XuWbkFriendLink){ window.XuWbkFriendLink.apply({name:n,url:u,desc:d,contact:c,icon:ic,category:cat,source:'site'}); }
    f.reset(); closeOverlay('submitModal'); showSuccess('提交成功！审核通过后将展示在首页对应分类板块');
  });}

  if(q('friendFormInline')){ q('friendFormInline').addEventListener('submit', function(e){
    e.preventDefault(); var f=this;
    var n=f.elements['name'].value.trim(), u=f.elements['url'].value.trim(), d=f.elements['desc'].value.trim(), c=f.elements['contact'].value.trim();
    if(!n||!u||!d){ showSuccess('请填写网站名称、地址和描述','err'); return; }
    if(window.XuWbkFriendLink){ window.XuWbkFriendLink.apply({name:n,url:u,desc:d,contact:c,source:'link'}); }
    f.reset(); closeOverlay('friendlinkModal'); showSuccess('友链申请已提交，等待管理员审核');
  });}

  // ===== 服务器 JSON 同步（共享数据，跨设备一致） =====
  /* 本机删除过的记录 id（墓碑）：服务器 JSON 不会再把它们加回来 */
  function readDeleted(){
    try { var v = JSON.parse(xwGet(KEY+'_deleted')||'[]'); return Array.isArray(v) ? v : []; } catch(e){ return []; }
  }
  function markDeleted(id){
    if(!id) return;
    var d = readDeleted();
    if(d.indexOf(id) < 0){ d.push(id); xwSet(KEY+'_deleted', JSON.stringify(d)); }
  }
  function clearDeleted(){ xwDel(KEY+'_deleted'); }
  /* 本机数据为准：服务器 JSON 只补充本机没有（且未被本机删除）的记录，绝不覆盖本机的编辑结果 */
  function applyServer(server){
    if(!Array.isArray(server) || !server.length) return false;
    var local = load(); var have = {}; var added = 0;
    local.forEach(function(x){ if(x && x.id) have[x.id] = 1; });
    var dead = {}; readDeleted().forEach(function(id){ dead[id] = 1; });
    var seed = {}; SEED.forEach(function(x){ if(x && x.id) seed[x.id] = 1; });
    server.forEach(function(x){
      if(!x || !x.id || have[x.id] || dead[x.id]) return;
      /* 基线记录已在本机被删除：登记墓碑，避免被服务器文件再加回来 */
      if(seed[x.id]){ markDeleted(x.id); dead[x.id] = 1; return; }
      local.push(x); have[x.id] = 1; added++;
    });
    if(!added) return false;
    MEM = local;
    xwSet(KEY, JSON.stringify(local)); xwSet(KEY+'_seeded','1');
    return true;
  }
  function hashStr(s){ var h=5381,i=0; for(;i<s.length;i++){ h=((h<<5)+h+s.charCodeAt(i))|0; } return 'h'+h+'_'+s.length; }
  function replaceLocal(server){
    MEM = server;
    xwSet(KEY, JSON.stringify(server)); xwSet(KEY+'_seeded','1');
  }
  /* data/services.json 是"已发布的快照"，规则：
     1) 本机没有数据（换设备 / 无痕）→ 直接采用快照
     2) 快照内容变了（你重新导出发并上传过）→ 采用新快照
     3) 快照没变 → 以本机数据为准，编辑/删除绝不会被还原 */
  /* data/services.json 是共享的“已发布快照”，服务端为唯一数据源：
     任何访客（含无痕）每次加载都直接采用服务器上的最新数据，
     站长保存 / 删除都会即时写回服务端，因此所有人看到的都是最新版本。 */
  function handleServer(server, hash){
    if(!Array.isArray(server) || !server.length) return false;
    replaceLocal(server);
    xwSet(KEY+'_srv', hash);
    return true;
  }
  /* 把当前数据发布到服务端（写 data/services.json）。pwd 与后台密码一致。 */
  /* 纯静态站点（GitHub Pages / Git 托管）：无法向服务端写文件。
     站长“保存 / 删除”直接落到本地存储；同时自动导出最新 services.json，
     把它提交到 Git 仓库的 data/ 目录并重新部署，即完成“发布”，
     全设备 / 无痕访客加载时即可读到同一份最新数据。 */
  function publishToGit(){
    try{
      var data=JSON.stringify(load(), null, 2);
      var blob=new Blob([data], {type:'application/json'});
      var a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download='services.json';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1500);
    }catch(e){}
  }
  function pushToServer(list, cb){
    publishToGit();
    if(cb) cb(true);
  }
  function syncFromServer(cb){
    try{
      var xhr = new XMLHttpRequest();
      var base = (function(){
        var s = document.querySelector('script[src$="assets/js/footer.js"]');
        var src = s && s.getAttribute('src');
        if(!src) return '';
        var i = src.indexOf('assets/js/footer.js');
        return i < 0 ? '' : src.slice(0, i);
      })();
      xhr.open('GET', base + 'data/services.json?_=' + Date.now(), true);
      xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4) return;
        var ok = false;
        if(xhr.status === 200 && xhr.responseText){
          try {
            var txt = String(xhr.responseText).replace(/^\uFEFF/, '');
            ok = handleServer(JSON.parse(txt), hashStr(txt));
          } catch(e){ ok = false; }
        }
        if(cb) cb(ok);
      };
      xhr.onerror = function(){ if(cb) cb(false); };
      xhr.send();
    }catch(e){ if(cb) cb(false); }
  }

  /* ===== 存储可用性检测：被禁用时明确提示，避免"改了又没" ===== */
  function storageAvailable(){
    return xwAvail();
  }
  function showStorageWarning(){
    if(document.getElementById('xw-storage-warn')) return;
    var d=document.createElement('div');
    d.id='xw-storage-warn';
    d.style.cssText='position:fixed;left:0;right:0;top:0;z-index:2147483000;background:#c62828;color:#fff;font-size:13px;line-height:1.6;padding:8px 34px 8px 12px;text-align:center;font-family:inherit;box-shadow:0 2px 8px rgba(0,0,0,.25)';
    d.innerHTML='浏览器禁止了本站的本地存储（Cookie / 站点数据），这里的修改无法保存。<br>请允许本站保存数据，或退出无痕模式后再试。<span id="xw-storage-warn-x" style="position:absolute;right:10px;top:6px;cursor:pointer;font-size:16px;line-height:1">×</span>';
    document.body.appendChild(d);
    var x=document.getElementById('xw-storage-warn-x');
    if(x) x.addEventListener('click', function(){ if(d.parentNode) d.parentNode.removeChild(d); });
  }

  var __firstVisit = (function(){ try { return xwGet(KEY) === null; } catch(e){ return true; } })();
  var __canStore = storageAvailable();
  if(!__canStore) showStorageWarning();
  if(q('sl-del-invalid') && q('sl-del-invalid').parentNode){
    var __ver=document.createElement('span');
    __ver.style.cssText='font-size:11px;color:#c6c6c6;margin-left:6px;user-select:none';
    __ver.textContent='v1027b';
    q('sl-del-invalid').parentNode.appendChild(__ver);
  }
  try { console.log('[xuwbk] services v1027b | storage=' + (__canStore?'ok':'blocked') + ' | firstVisit=' + __firstVisit); } catch(e){}

  render();
  syncFromServer(function(){ render(); });
})();
