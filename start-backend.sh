#!/usr/bin/env bash

nohup sudo java -jar /vagrant/backend/ITCC-Tracking-1.0-SNAPSHOT.jar > /vagrant/backend/log.log 2>&1 &