# How to use vagrant

To setup, install:
- VirtualBox https://www.virtualbox.org/wiki/Downloads
- Vagrant https://www.vagrantup.com/downloads.html

To start vagrant, direct the terminal to the directory, where the vagrant-file is located and type

´vagrant up´

To ssh to the virtual machine type 

´vagrant ssh´.

To stop the virtual machine type

´vagrant halt´

## Ports
MongoDB is running on port 27017 in the virtual machine and gets forwared to the same port on the host.
The frontend is running on port 4200 in the virtual machine and gets forwared to the same port on the host.
You can access the frontend from the host under http://localhost:4200
The backend is running on port 2018 in the virtual machine and gets forwared to the same port on the host.