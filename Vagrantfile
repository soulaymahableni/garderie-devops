# -*- mode: ruby -*-
# VM Ubuntu Server pour le déploiement de "Ma Garderie"
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"          # Ubuntu Server 22.04 LTS
  config.vm.hostname = "garderie-vm"

  # Réseau privé avec IP fixe (accessible depuis la machine hôte)
  config.vm.network "private_network", ip: "192.168.56.10"

  # Redirection de ports : permet aux AUTRES machines du réseau
  # d'accéder à l'application via http://<IP-du-PC-hôte>:3000
  config.vm.network "forwarded_port", guest: 3000, host: 3000, host_ip: "0.0.0.0"
  config.vm.network "forwarded_port", guest: 5000, host: 5000, host_ip: "0.0.0.0"

  config.vm.provider "virtualbox" do |vb|
    vb.name   = "garderie-vm"
    vb.memory = 2048   # 2 Go de RAM
    vb.cpus   = 2      # 2 vCPU
  end

  # Provisioning Ansible : "ansible_local" installe Ansible DANS la VM
  # et exécute le playbook -> fonctionne aussi sur un hôte Windows.
  config.vm.provision "ansible_local" do |ansible|
    ansible.provisioning_path = "/vagrant/ansible"
    ansible.playbook          = "site.yml"
    ansible.inventory_path    = "inventory.ini"
    ansible.limit             = "all"
    ansible.install_mode      = "default"
  end

  # Alternative si Ansible est installé sur la machine hôte (Linux / macOS / WSL) :
  # config.vm.provision "ansible" do |ansible|
  #   ansible.playbook = "ansible/site.yml"
  # end
end
