#!/bin/bash



BASE=`basename $1 .svg`
echo $BASE
inkscape -z -f $1 \
         -e $2/$BASE.exported.png \
         -A $2/$BASE.exported.pdf

