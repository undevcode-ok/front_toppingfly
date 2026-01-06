module.exports = {
  apps: [
    {
      name: "front_toppingfly",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      // En lugar de require('dotenv'), PM2 puede cargar el archivo directamente
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
        // Las variables se leerán de aquí si usas --env production o si ya están en el sistema
      },
      // Esto le dice a PM2 que use tu archivo de variables de entorno
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    },
  ],
};