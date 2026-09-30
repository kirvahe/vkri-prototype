#!/usr/bin/env python3
"""VKRI prototype server: static files + one shared database for every device on the Wi-Fi.

    python3 serve.py            # then open the printed address on the MacBook and on the iPhone

Python standard library only. The mutation log lives in .data/ops.json next to this file.
"""
import json
import os
import socket
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(ROOT, ".data")
STORE = os.path.join(DATA, "ops.json")
LOCK = threading.Lock()


def load():
    try:
        with open(STORE) as f:
            return json.load(f)
    except (OSError, ValueError):
        return {"epoch": 1, "ops": []}


def save(db):
    os.makedirs(DATA, exist_ok=True)
    tmp = STORE + ".tmp"
    with open(tmp, "w") as f:
        json.dump(db, f)
    os.replace(tmp, STORE)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, fmt, *args):
        if "/api/ops" not in str(args[0] if args else ""):
            super().log_message(fmt, *args)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, payload, status=200):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith("/api/ops"):
            since = 0
            if "since=" in self.path:
                try:
                    since = int(self.path.split("since=")[1].split("&")[0])
                except ValueError:
                    since = 0
            with LOCK:
                db = load()
            return self._json({"epoch": db["epoch"], "rev": len(db["ops"]), "since": since, "ops": db["ops"][since:]})
        if self.path.startswith("/.data"):
            return self.send_error(404)
        return super().do_GET()

    def do_POST(self):
        if not self.path.startswith("/api/ops"):
            return self.send_error(404)
        length = int(self.headers.get("Content-Length", 0))
        try:
            op = json.loads(self.rfile.read(length))
        except ValueError:
            return self.send_error(400)
        with LOCK:
            db = load()
            if not any(o.get("oid") == op.get("oid") for o in db["ops"]):
                db["ops"].append(op)
                save(db)
            rev = len(db["ops"])
        return self._json({"epoch": db["epoch"], "rev": rev})

    def do_DELETE(self):
        if not self.path.startswith("/api/ops"):
            return self.send_error(404)
        with LOCK:
            db = load()
            db = {"epoch": db["epoch"] + 1, "ops": []}
            save(db)
        return self._json({"epoch": db["epoch"], "rev": 0})


def lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        return s.getsockname()[0]
    except OSError:
        return None
    finally:
        s.close()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print("VKRI prototype is running.\n")
    print("  On this Mac:   http://localhost:%d" % port)
    ip = lan_ip()
    if ip:
        print("  On the iPhone: http://%s:%d   (same Wi-Fi)" % (ip, port))
    print("                 http://%s:%d" % (socket.gethostname(), port))
    print("\nCtrl+C to stop. Reset the demo data from the sign-in page.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
