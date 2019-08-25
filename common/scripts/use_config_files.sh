#!/bin/bash

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
"$parent_path/check_sign_key.sh"

function enc_file() {
  openssl enc -in $1 -md md5 -out $2 $param -des-ede3-cbc -pass pass:$SIGN_KEY
}

param="$1"
args=("$@")
files=("${args[@]:1}")

case $param in
-d)
  for paths in "${files[@]}"; do
    enc_file "${paths%%:*}" "${paths#*:}"
  done
  ;;
-e)
  for paths in "${files[@]}"; do
    enc_file "${paths#*:}" "${paths%%:*}"
  done
  ;;
esac
