#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

pnpm unpublish "@axonivy/log-view@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/log-view-core@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/log-view-protocol@${1}" --registry $REGISTRY
