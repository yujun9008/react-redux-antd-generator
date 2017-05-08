#!/bin/sh
# Author: Yanyu
# Description: 
#   a front-end build script for seajs based project, use nodejs enviroment and grunt tool to
#   transport cmd modules, concat, minify, uglify js/tpl/css... resources.
# Date: 2016/08/23
# 
set -e
source /etc/profile
echo "======> run FE's build procedure start <======"
startTime=`date "+%s"`
chmod -R 777 ./
npm install
npm run dist
endTime=`date "+%s"`
cost=$[$endTime-$startTime]
echo " ------------------------------------------------------------------------"
echo "  FE's BUILD SUCCESS"
echo " ------------------------------------------------------------------------"
echo "  Total time: ${cost}s"
echo "  Finished at: `date '+%Y-%m-%d %H:%M:%S'`"
echo " ------------------------------------------------------------------------"
echo "======> run FE's build procedure end <======"