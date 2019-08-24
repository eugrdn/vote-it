#!/bin/bash

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
sh "$parent_path/check_sign_key.sh"

function encode_file() {
  openssl aes-256-cbc -e -in $1 -out $2 -k $SIGN_KEY
}

function decode_file() {
  openssl aes-256-cbc -d -in $1 -out $2 -k $SIGN_KEY
}

args=("$@")
param="$1"
files=("${args[@]:1}")

case $param in
-d)
  for paths in "${files[@]}"; do
    decode_file "${paths%%:*}" "${paths#*:}"
  done
  ;;
-e)
  for paths in "${files[@]}"; do
    encode_file "${paths#*:}" "${paths%%:*}"
  done
  ;;
esac
