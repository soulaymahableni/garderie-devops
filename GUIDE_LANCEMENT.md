# Guide de lancement pas à pas (sur votre PC)

## 0. Prérequis à installer
| Outil | Lien |
|---|---|
| Git | https://git-scm.com |
| Node.js 20 LTS | https://nodejs.org |
| Docker Desktop (Windows/Mac) ou Docker Engine (Linux) | https://www.docker.com |
| VirtualBox 7 | https://www.virtualbox.org |
| Vagrant | https://developer.hashicorp.com/vagrant/install |
| Compte Docker Hub + **Access Token** (Account Settings → Personal access tokens) | https://hub.docker.com |

> Windows : pas besoin d'installer Ansible, il est installé automatiquement **dans la VM** (`ansible_local`).

---

## 1. Tester l'application en local (étapes 1 → 8)
```bash
cd garderie-devops

# Test du frontend
cd frontend && npm install && npm test && cd ..

# Lancer les 2 services avec Docker Compose
docker compose up -d --build
```
Ouvrir http://localhost:3000 → la page affiche Navbar, Hero, Services et Activités.
API : http://localhost:5000/api/garderie, /api/services, /api/activites

Arrêter ensuite (sinon le port 3000 sera occupé pour la VM) :
```bash
docker compose down
```

## 2. Publier sur GitHub (branche main)
Créer sur GitHub un dépôt **public** vide nommé `garderie-devops`, puis :
```bash
git init
git branch -M main
git add backend frontend docker-compose.yml Jenkinsfile jenkins .gitignore
git commit -m "Application Ma Garderie : frontend Next.js, backend Express, Dockerfiles, Jenkinsfile"
git remote add origin https://github.com/VOTRE_USER/garderie-devops.git
git push -u origin main
```
> Les fichiers Vagrant/Ansible/deployment/README sont ajoutés ensuite dans leurs branches (étapes 4 à 7).

## 3. Jenkins (Partie 1)
```bash
cd jenkins
docker compose up -d --build
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
cd ..
```
1. http://localhost:8080 → coller le mot de passe → *Install suggested plugins* → créer l'admin.
2. **Manage Jenkins → Credentials → System → Global credentials → Add Credentials**
   - Kind : `Username with password`
   - Username : votre user Docker Hub — Password : votre Access Token
   - **ID : `dockerhub-credentials`** (exactement ce nom)
3. **New Item** → nom `garderie-devops` → **Pipeline** → OK
   - Definition : `Pipeline script from SCM` → SCM : `Git`
   - Repository URL : `https://github.com/VOTRE_USER/garderie-devops.git`
   - Branch : `*/main` — Script Path : `Jenkinsfile` → Save
4. **Build Now** → toutes les étapes en vert → capture `screenshots/jenkins-pipeline.png`
5. Sur hub.docker.com : vérifier `garderie-frontend` et `garderie-backend` → capture `screenshots/dockerhub.png`

> Démo de l'arrêt sur échec : changer « Ma Garderie » dans `frontend/__tests__/Navbar.test.js`, pousser, relancer → le pipeline s'arrête à *Test*. Remettre ensuite.

## 4. Vagrant (Partie 2)
```bash
git checkout -b feature/vagrant
git add Vagrantfile
git commit -m "Ajout du Vagrantfile (Ubuntu, 2 Go, 2 vCPU, 192.168.56.10)"
```
(La VM sera démarrée à l'étape suivante, avec Ansible. Pour tester tout de suite : `vagrant up --no-provision` puis `vagrant ssh`.)
```bash
git checkout main
git merge --no-ff feature/vagrant -m "Merge feature/vagrant"
git push origin main feature/vagrant
```

## 5. Ansible (Partie 3)
```bash
git checkout -b feature/ansible
git add ansible
git commit -m "Ajout du rôle Ansible docker et du playbook site.yml"

vagrant up            # (ou "vagrant provision" si la VM tourne déjà)
```
Captures : sortie de `vagrant up` (`vagrant-up.png`) et le récapitulatif Ansible `PLAY RECAP ... failed=0` (`ansible-playbook.png`).

Vérification :
```bash
vagrant ssh -c "docker --version && docker compose version"
```
```bash
git checkout main
git merge --no-ff feature/ansible -m "Merge feature/ansible"
git push origin main feature/ansible
```

## 6. Déploiement (Partie 4)
```bash
git checkout -b feature/deployment
git add deployment
git commit -m "Ajout du docker-compose de déploiement (images Docker Hub)"
```
Dans la VM :
```bash
vagrant ssh
cd /vagrant/deployment
cp .env.example .env
nano .env                     # DOCKERHUB_USER=votre_user
docker compose pull
docker compose up -d
docker compose ps             # 2 conteneurs "Up" -> capture docker-ps.png
curl localhost:5000/api/garderie
curl localhost:5000/api/services
curl localhost:5000/api/activites
exit
```
```bash
git checkout main
git merge --no-ff feature/deployment -m "Merge feature/deployment"
git push origin main feature/deployment
```

## 7. Accès depuis une autre machine (Partie 5)
- Depuis votre PC : http://192.168.56.10:3000
- Depuis un autre PC / téléphone **sur le même Wi-Fi** : http://IP_DE_VOTRE_PC:3000
  - IP de votre PC : `ipconfig` (Windows) ou `ip a` (Linux)
  - Windows : autoriser le port 3000 dans le pare-feu si besoin :
    `netsh advfirewall firewall add rule name="Garderie" dir=in action=allow protocol=TCP localport=3000` (PowerShell admin)
- Capture : `screenshots/app-navigateur.png`

## 8. README + captures
Mettre les 6 captures dans `screenshots/` avec les noms utilisés dans le README :
`jenkins-pipeline.png, dockerhub.png, vagrant-up.png, ansible-playbook.png, docker-ps.png, app-navigateur.png`
Dans le README, remplacer `DOCKERHUB_USER` par votre identifiant.
```bash
git checkout -b docs/readme
git add README.md GUIDE_LANCEMENT.md screenshots
git commit -m "Documentation README et captures d'écran"
git checkout main
git merge --no-ff docs/readme -m "Merge docs/readme"
git push origin main docs/readme
```

## Livrables
- Lien GitHub : `https://github.com/VOTRE_USER/garderie-devops`
- Docker Hub : `https://hub.docker.com/r/VOTRE_USER/garderie-frontend` et `.../garderie-backend`

---

## Problèmes fréquents
| Problème | Solution |
|---|---|
| `vagrant up` : VT-x / Hyper-V | Activer la virtualisation dans le BIOS ; utiliser VirtualBox 7.x |
| Port 3000 déjà utilisé au `vagrant up` | `docker compose down` sur le PC (étape 1) |
| Jenkins : `docker: permission denied` | Le conteneur Jenkins tourne en root (déjà configuré) ; relancer `docker compose up -d` dans `jenkins/` |
| Jenkins : `npm: not found` | Utiliser l'image `jenkins/` fournie (Node.js inclus) |
| Push refusé Docker Hub | Vérifier l'ID `dockerhub-credentials` et utiliser un Access Token *Read & Write* |
| Page affiche « Backend injoignable » | `docker compose ps` : le backend doit être *Up* ; vérifier `BACKEND_URL=http://backend:5000` |
