#!/bin/bash

package=$PWD

files=(
  "$package/common/configuration/app-keys-prod.enc:$package/voteit-app-keys.json"
  "$package/common/configuration/app-keys-stg.enc:$package/voteit-app-stg-keys.json"
)

"../../../common/scripts/use_config_files.sh" -d "${files[@]}"
