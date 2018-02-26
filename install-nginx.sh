#!/usr/bin/env bash

#taken from http://tech.osteel.me/posts/2015/01/25/how-to-use-vagrant-for-local-web-development.html
sudo apt-get -y install nginx --force-yes
sudo service nginx start

sudo cp /vagrant/nginx.conf /etc/nginx/sites-available/site.conf
sudo chmod 644 /etc/nginx/sites-available/site.conf
sudo ln -s /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/site.conf

sudo rm -Rf /var/www
sudo ln -s /vagrant/frontend /var/www

sudo service nginx restart
