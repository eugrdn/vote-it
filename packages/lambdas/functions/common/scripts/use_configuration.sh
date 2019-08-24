#!/bin/bash

files=(
  "../configuration/enc-app-keys-prod:../../voteit-app-keys.json"
  "../configuration/enc-app-keys-stg:../../voteit-app-stg-keys.json"
)

sh "../../../../../common/scripts/use_config_files.sh" -d "${files[@]}"
