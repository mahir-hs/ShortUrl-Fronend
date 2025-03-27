pipeline {
    agent any

    environment {
        npm_config_cache = "${WORKSPACE}/.npm"
        NODE_OPTIONS = "--max_old_space_size=4096"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Beta_Branch', url: 'https://github.com/mahir-hs/ShortUrl-Frontend.git'
            }
        }

        stage('Verify Workspace') {
            steps {
                bat '''
                echo "Workspace contents:"
                dir
                echo "Checking for angular.json..."
                if not exist angular.json (
                    echo "ERROR: angular.json not found!"
                    exit 1
                )
                '''
            }
        }

        stage('Install Tools') {
            steps {
                bat '''
                echo "Installing Angular CLI..."
                npm install -g @angular/cli@18.2.11
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                echo "Installing dependencies..."
                npm install
                npm install @angular-devkit/build-angular --save-dev
                '''
            }
        }

        stage('Build Project') {
            steps {
                bat '''
                echo "Building Angular application..."
                npx ng build --configuration production
                '''
            }
        }

        stage('Verify Build Output') {
            steps {
                bat '''
                echo "Build output contents:"
                dir dist\\frontend
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/frontend/**/*', allowEmptyArchive: false
            }
        }
    }

}