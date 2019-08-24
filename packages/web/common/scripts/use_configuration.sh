#!/bin/bash

files=(
  "../configuration/enc-service-account:../../serviceAccount.json"
  "../configuration/enc-cypress-env:../../cypress.env.json"
  "../configuration/enc-firebase-config:../../cypress/support/firebase.config.json"
  "../configuration/enc-cypress-config:../../cypress/config.json"
  "../configuration/enc-cypress-config:../../cypress/config.json"
)

sh "../../../../common/scripts/use_config_files.sh" -d "${files[@]}"
