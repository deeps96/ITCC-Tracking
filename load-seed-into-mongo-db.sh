#!/usr/bin/env bash
mongo tracking-db /vagrant/clear-mongo-database.js
mongoimport --db tracking-db --collection users --file /vagrant/seed/users.json
mongoimport --db tracking-db --collection transportation-modes --file /vagrant/seed/transportation-modes.json
mongoimport --db tracking-db --collection roles --file /vagrant/seed/roles.json
mongoimport --db tracking-db --collection parcel-types --file /vagrant/seed/parcel-types.json
mongoimport --db tracking-db --collection action-descriptions --file /vagrant/seed/action-descriptions.json
mongoimport --db tracking-db --collection parcel-entries --file /vagrant/seed/parcel-entries.json
