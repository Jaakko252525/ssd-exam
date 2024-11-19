pipeline {
    agent any

    stages {

        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dependencyCheck additionalArguments: ''' 
                    -o './'
                    -s './'
                    -f 'ALL' 
                    --prettyPrint''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'

                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }

        stage('Setup Environment') {
            steps {
                // Install Node.js if not already available
                script {
                    def nodeExists = sh(returnStatus: true, script: 'node -v') == 0
                    if (!nodeExists) {
                        error("Node.js is not installed on the agent. Please install it before running the pipeline.")
                    }
                }
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }

        stage('Run App') {
            steps {
                // Start the application in the background
                sh 'node app.js &'
            }
        }

        stage('Run UI Tests') {
            steps {
                // Run the UI tests after app.js has started
                sh 'node ui-test.js'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'App ran successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
