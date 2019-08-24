#!/bin/bash

parent_path=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
"$parent_path/check_sign_key.sh"

function encode_file() {
  openssl enc -in $1 -md md5 -out $2 -e -des-ede3-cbc -pass pass:$SIGN_KEY
}

function decode_file() {
  openssl enc -in $1 -md md5 -out $2 -d -des-ede3-cbc -pass pass:$SIGN_KEY

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
