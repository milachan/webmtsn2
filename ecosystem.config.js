module.exports = {
  apps: [{
    name: 'mtsn2-web',
    script: 'npm.cmd',
    args: 'run dev',
    cwd: 'D:\\vscode\\mtsn2',
    interpreter: 'none',
    watch: false,
    env: {
      NODE_ENV: 'development'
    }
  }]
};