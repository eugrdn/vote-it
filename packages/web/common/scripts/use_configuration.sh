#!/bin/bash

package=$PWD

[[ package == *"node_modules"* ]] && exit 0

files=(
  "$package/common/configuration/enc-service-account:$package/serviceAccount.json"
  "$package/common/configuration/enc-cypress-env:$package/cypress.env.json"
  "$package/common/configuration/enc-firebase-config:$package/cypress/support/firebase.config.json"
  "$package/common/configuration/enc-cypress-config:$package/cypress/config.json"
  "$package/common/configuration/enc-cypress-config:$package/cypress/config.json"
)

"../../common/scripts/use_config_files.sh" -d "${files[@]}"
