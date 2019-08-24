#!/bin/bash

package=$PWD

files=(
  "$package/common/configuration/enc-app-keys-prod:$package/voteit-app-keys.json"
  "$package/common/configuration/enc-app-keys-stg:$package/voteit-app-stg-keys.json"
)

sh "../../../common/scripts/use_config_files.sh" -d "${files[@]}"
