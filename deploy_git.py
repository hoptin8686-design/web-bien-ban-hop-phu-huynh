import os
import subprocess
import sys

GIT = r'C:\Users\DMX HOA THUAN\AppData\Local\Programs\Git\cmd\git.exe'
GH = r'C:\Users\DMX HOA THUAN\AppData\Local\Programs\gh\bin\gh.exe'
CWD = r'D:\Du-an-web\web-bien-ban-hop-phu-huynh'

env = os.environ.copy()
env['PATH'] = os.path.dirname(GIT) + ';' + os.path.dirname(GH) + ';' + env.get('PATH', '')

def run_cmd(args):
    print("RUNNING:", " ".join(args))
    r = subprocess.run(args, cwd=CWD, env=env, capture_output=True, text=True)
    if r.stdout:
        print("STDOUT:", r.stdout.strip())
    if r.stderr:
        print("STDERR:", r.stderr.strip())
    return r.returncode

# 1. git init
run_cmd([GIT, 'init'])
run_cmd([GIT, 'config', 'user.name', 'hoptin8686-design'])
run_cmd([GIT, 'config', 'user.email', 'hoptin8686@gmail.com'])
run_cmd([GIT, 'branch', '-M', 'main'])

# 2. git add and commit
run_cmd([GIT, 'add', '.'])
run_cmd([GIT, 'commit', '-m', 'Khoi tao ung dung Bien ban hop phu huynh dau nam THPT Phuc Hoa'])

# 3. Create repo on GitHub or check if exists
code = run_cmd([GH, 'repo', 'create', 'web-bien-ban-hop-phu-huynh', '--public', '--source=.', '--remote=origin', '--push'])
if code != 0:
    print("Repo might already exist or remote needed, trying push...")
    run_cmd([GIT, 'remote', 'set-url', 'origin', 'https://github.com/hoptin8686-design/web-bien-ban-hop-phu-huynh.git'])
    run_cmd([GIT, 'push', '-u', 'origin', 'main'])

print("FINISHED GITHUB STEP!")
