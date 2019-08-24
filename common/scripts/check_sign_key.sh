#!/bin/bash

if [ -z ${SIGN_KEY+x} ]; then
  printf '%s\n' "\$SIGN_KEY param invalid!" >&2
  exit 1
fi
