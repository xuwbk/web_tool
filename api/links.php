<?php
/**
 * 友情链接（友链申请 / 网址提交）的服务端快照读写接口
 * - GET  : 返回 data/links.json（已发布的共享数据），任何访客读取
 * - POST : 校验后台密码后，将最新数据原子写入 data/links.json（自动发布）
 *
 * 说明：后台密码写在客户端 JS 中（与站点现有逻辑一致），仅用于避免随意篡改，
 * 并非强安全机制。若需更强保护，请在此处改为服务端密钥或访问控制。
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');

$file = __DIR__ . '/../data/links.json';
$PWD  = 'xuwbk.com';

$method = isset($_SERVER['REQUEST_METHOD']) ? strtoupper($_SERVER['REQUEST_METHOD']) : 'GET';

/* ============ GET：读取共享快照 ============ */
if ($method === 'GET') {
    if (!is_file($file)) {
        echo json_encode(array());
        exit;
    }
    $txt = @file_get_contents($file);
    if ($txt === false || $txt === '') {
        echo json_encode(array());
        exit;
    }
    $data = json_decode($txt, true);
    if (!is_array($data)) {
        echo json_encode(array());
        exit;
    }
    echo $txt;
    exit;
}

/* ============ POST：写入（发布）共享快照 ============ */
if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $obj = json_decode($raw, true);

    if (!is_array($obj) || !isset($obj['pwd']) || !isset($obj['data']) || !is_array($obj['data'])) {
        http_response_code(400);
        echo json_encode(array('ok' => false, 'error' => 'bad_request'));
        exit;
    }
    if ((string) $obj['pwd'] !== $PWD) {
        http_response_code(403);
        echo json_encode(array('ok' => false, 'error' => 'forbidden'));
        exit;
    }

    // 仅保留含 id 的对象，避免脏数据
    $clean = array();
    foreach ($obj['data'] as $it) {
        if (is_array($it) && isset($it['id'])) {
            $clean[] = $it;
        }
    }

    $out = json_encode($clean, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    if ($out === false) {
        http_response_code(500);
        echo json_encode(array('ok' => false, 'error' => 'encode'));
        exit;
    }

    $dir = dirname($file);
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    if (!is_writable($dir)) {
        http_response_code(500);
        echo json_encode(array('ok' => false, 'error' => 'dir_not_writable'));
        exit;
    }

    // 原子写入：先写临时文件再重命名
    $tmp = $file . '.tmp';
    if (@file_put_contents($tmp, $out) === false) {
        http_response_code(500);
        echo json_encode(array('ok' => false, 'error' => 'write_failed'));
        exit;
    }
    if (!@rename($tmp, $file)) {
        @unlink($tmp);
        http_response_code(500);
        echo json_encode(array('ok' => false, 'error' => 'rename_failed'));
        exit;
    }

    echo json_encode(array('ok' => true, 'count' => count($clean)));
    exit;
}

http_response_code(405);
echo json_encode(array('ok' => false, 'error' => 'method_not_allowed'));
