#!/bin/bash

OIFS="$IFS"
IFS=$'\n'
for file in $(find ./videos -name *.mp4 -type f); do ffmpeg -i ${file} -q:a 0 -map a ${file/.mp4/.mp3}; done;
IFS="$OIFS"
