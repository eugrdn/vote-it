#!/bin/bash

package=$PWD

files=(
  "$package/common/configuration/enc-service-account:$package/serviceAccount.json"
  "$package/common/configuration/enc-cypress-env:$package/cypress.env.json"
  "$package/common/configuration/enc-firebase-config:$package/cypress/support/firebase.config.json"
  "$package/common/configuration/enc-cypress-config:$package/cypress/config.json"
  "$package/common/configuration/enc-cypress-config:$package/cypress/config.json"
)

sh "../../common/scripts/use_config_files.sh" -d "${files[@]}"
