#!/bin/bash
 
# Invoke the Forever module (to START our Node.js server).
forever \
start \
-al forever.log \
-ao out.log \
-ae err.log \
Server.js
