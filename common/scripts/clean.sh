#!/bin/bash

files=(
  "node_modules"
  # web
  "packages/web/node_modules"
  "packages/web/.next"
  "packages/web/serviceAccount.json"
  "packages/web/cypress.env.json"
  "packages/web/cypress/support/firebase.config.json"
  "packages/web/cypress/config.json"
  "packages/web/cypress/config.json"
  # functions
  "packages/lambdas/functions/node_modules"
  "packages/lambdas/functions/lib"
  "packages/lambdas/functions/voteit-app-keys.json"
  "packages/lambdas/functions/voteit-app-stg-keys.json"
)

rm -rf "${files[@]}"
