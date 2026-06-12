#!/bin/bash
cd /home/user/webapp
exec ./node_modules/.bin/wrangler pages dev dist --ip 0.0.0.0 --port 3000 --compatibility-date 2026-05-01
