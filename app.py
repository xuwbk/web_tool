import http.server
import socketserver
import os
import sys
import traceback
import socket

# ===== 端口检测 =====
def find_open_port():
    for p in [3000, 8000, 8080, 5000, 80, 9000]:
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.bind(("0.0.0.0", p))
            s.close()
            return p
        except OSError:
            continue
    return 8080

PORT = find_open_port()
# ====================

# 定位站点目录
BASE = os.path.dirname(os.path.abspath(__file__))
if os.path.isfile(os.path.join(BASE, "index.html")):
    ROOT = BASE
else:
    for name in os.listdir(BASE):
        cand = os.path.join(BASE, name)
        if os.path.isdir(cand) and os.path.isfile(os.path.join(cand, "index.html")):
            ROOT = cand
            break
    else:
        ROOT = BASE

os.chdir(ROOT)

# 启动信息
print("=" * 60, flush=True)
print(f"PORT env var : {os.environ.get('PORT', 'NOT SET')}", flush=True)
print(f"Binding PORT : {PORT}", flush=True)
print(f"SITE ROOT    : {ROOT}", flush=True)
print(f"index.html   : {os.path.isfile('index.html')}", flush=True)
print(f"cwd files    : {sorted(os.listdir('.'))}", flush=True)
print("=" * 60, flush=True)

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, fmt, *args):
        sys.stderr.write("[%s] %s\n" % (self.address_address, fmt % args))
        sys.stderr.flush()

    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        elif self.path.endswith('/'):
            self.path += 'index.html'
        elif '.' not in self.path.split('/')[-1]:
            if os.path.isdir('.' + self.path):
                self.path += '/index.html'
        super().do_GET()

try:
    print(f"Starting TCP server on 0.0.0.0:{PORT} ...", flush=True)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"✅ Server listening on 0.0.0.0:{PORT}", flush=True)
        sys.stdout.flush()
        httpd.serve_forever()
except OSError as e:
    print(f"❌ FATAL: Cannot bind port {PORT}: {e}", flush=True)
    traceback.print_exc()
    sys.stdout.flush()
    sys.stderr.flush()
    raise
except Exception as e:
    print(f"❌ FATAL: Unexpected error: {e}", flush=True)
    traceback.print_exc()
    sys.stdout.flush()
    sys.stderr.flush()
    raise
