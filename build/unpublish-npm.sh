#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

npm unpublish "@axonivy/log-view@${1}" --registry $REGISTRY
npm unpublish "@axonivy/log-view-core@${1}" --registry $REGISTRY
npm unpublish "@axonivy/log-view-protocol@${1}" --registry $REGISTRY
