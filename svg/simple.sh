#!/bin/bash

PWD=`pwd`
for F in `find . -type f -name "*.svg"`
 do
   BASE=`basename $F .svg`
   echo $PWD/$BASE
   /Applications/Inkscape.app/Contents/Resources/bin/inkscape -z -f $PWD/$F -l $PWD/$BASE.simple.svg
done
