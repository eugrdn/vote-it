#!/bin/bash

package=$PWD

files=(
  "$package/common/configuration/service-account.enc:$package/serviceAccount.json"
  "$package/common/configuration/cypress-env.enc:$package/cypress.env.json"
  "$package/common/configuration/firebase-config.enc:$package/cypress/support/firebase.config.json"
  "$package/common/configuration/cypress-config.enc:$package/cypress/config.json"
  "$package/common/configuration/cypress-config.enc:$package/cypress/config.json"
)

"../../common/scripts/use_config_files.sh" -d "${files[@]}"
