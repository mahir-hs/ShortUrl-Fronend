pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                bat '''
                npm install -g @angular/cli@18.2.11
                npm install
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                npm run build -- --configuration=production
                '''
            }
        }

        stage('Verify Output') {
            steps {
                bat '''
                echo "Build artifacts:"
                dir /s dist
                '''
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: false
            }
        }
    }

    post {
        always {
            cleanWs()  // Clean workspace after build
        }
    }
}