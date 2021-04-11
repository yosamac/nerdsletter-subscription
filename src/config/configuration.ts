export default () => ({
  host: process.env.MESH_HOST || '0.0.0.0',
  port: parseInt(process.env.MESH_PORT, 10) || 4001,
  logger: {
    level: process.env.LOG_LEVEL || process.env.LOGGING_LEVEL || 'INFO'
  },
  mesh: {
    email: {
      host: process.env.EMAIL_MESH_HOST || '0.0.0.0',
      port: parseInt(process.env.EMAIL_MESH_PORT, 10) || 4002
    },
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/nerdsletter_subscription'
  }
});