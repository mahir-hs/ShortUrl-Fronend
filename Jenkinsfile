pipeline {
    agent any

    environment {
        // Customize Node.js cache directory
        npm_config_cache = "${WORKSPACE}/.npm"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Check Versions') {
            steps {
                bat '''
                echo "Node.js version:"
                node --version
                echo "npm version:"
                npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                npm install -g @angular/cli@18.2.11
                npm install
                npm install @angular-devkit/build-angular
                npm install @angular/ssr
                '''
            }
        }

        stage('Build Production') {
            steps {
                bat '''
                npx ng build --configuration=production
                '''
            }
        }

        stage('Build SSR') {
            steps {
                bat '''
                npx ng run frontend:server:production
                '''
            }
        }

        stage('Verify Output') {
            steps {
                bat '''
                echo "Browser files:"
                dir /s dist\\frontend\\browser
                echo "Server files:"
                dir /s dist\\frontend\\server
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/frontend/**/*', allowEmptyArchive: false
            }
        }
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
        success {
            // Optional: Notify success (Slack, Email, etc.)
            echo 'Build succeeded!'
        }
        failure {
            // Optional: Notify failure
            echo 'Build failed!'
        }
    }
}