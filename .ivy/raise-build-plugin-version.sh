#!/bin/bash

mvn --batch-mode versions:set-property versions:commit -f playwright/log-test-project/pom.xml -Dproperty=project.build.plugin.version -DnewVersion=${2} -DallowSnapshots=true
