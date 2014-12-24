#!/bin/sh
set -e
# start selenium
nohup /usr/local/bin/webdriver-manager start & while ! nc -vz localhost 4444; do sleep 1; done

# run the build
NODE_ENV=production gulp protractor

# stop selenium
curl -s -L http://localhost:4444/selenium-server/driver?cmd=shutDownSeleniumServer > /dev/null 2>&1