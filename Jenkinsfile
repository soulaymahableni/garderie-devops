pipeline {
    agent any

    environment {
        // Identifiants Docker Hub stockés dans Jenkins Credentials
        // (type "Username with password", ID = dockerhub-credentials).
        // Jenkins crée automatiquement DOCKERHUB_USR et DOCKERHUB_PSW (masqués dans les logs).
        DOCKERHUB = credentials('dockerhub-credentials')
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                dir('backend')  { sh 'npm ci' }
                dir('frontend') { sh 'npm ci' }
            }
        }

        stage('Test') {
            steps {
                // Si le test échoue, "sh" renvoie un code d'erreur : le pipeline
                // s'arrête immédiatement et les étapes Build / Push ne sont pas exécutées.
                dir('frontend') { sh 'npm test' }
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t $DOCKERHUB_USR/garderie-frontend:$IMAGE_TAG -t $DOCKERHUB_USR/garderie-frontend:latest ./frontend'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t $DOCKERHUB_USR/garderie-backend:$IMAGE_TAG -t $DOCKERHUB_USR/garderie-backend:latest ./backend'
            }
        }

        stage('Push Frontend') {
            steps {
                sh 'echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin'
                sh 'docker push $DOCKERHUB_USR/garderie-frontend:$IMAGE_TAG'
                sh 'docker push $DOCKERHUB_USR/garderie-frontend:latest'
            }
        }

        stage('Push Backend') {
            steps {
                sh 'docker push $DOCKERHUB_USR/garderie-backend:$IMAGE_TAG'
                sh 'docker push $DOCKERHUB_USR/garderie-backend:latest'
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo 'Pipeline réussi : images frontend et backend publiées sur Docker Hub.'
        }
        failure {
            echo 'Pipeline échoué : consulter les logs (test automatisé en échec ?).'
        }
    }
}
