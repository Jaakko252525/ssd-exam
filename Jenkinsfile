pipeline {
    agent any

    stages {
        // OWASP Dependency-Check Vulnerabilities Stage - Run before the app
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                // Run the OWASP Dependency-Check scan with additional arguments
                dependencyCheck additionalArguments: ''' 
                    -o './'
                    -s './'
                    -f 'ALL' 
                    --prettyPrint''', 
                    odcInstallation: 'OWASP Dependency-Check Vulnerabilities'

                // Publish the Dependency-Check report
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
                // Run the application
                sh 'node app.js'
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
