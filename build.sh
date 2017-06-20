#!/bin/bash
cd /opt/deploy/m2m-monitriip-web/
rm -rf bower_components
bower cache clean --allow-root
bower install --allow-root