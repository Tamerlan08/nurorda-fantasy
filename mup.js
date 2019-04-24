module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '134.209.247.154',
      username: 'root',
      password: 'nurorda725',
      // pem: './path/to/pem'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'nurordafantasy',
    path: '/Users/tengiz2003/nurorda-fantasy',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://

      ROOT_URL: 'http://nurordafantasy.info',
      PORT: 3000,
      MONGO_URL: 'mongodb://localhost/nurordafantasy',
      "CLUSTER_WORKERS_COUNT": "auto"
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.11.3-base',
    },

    ssl: {
      autogenerate: {
        email: '',
        domains: 'nurordafantasy.info'
      }
    },
    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    port: 27017,
    version: '3.6.4',
    servers: {
      one: {}
    }
  },
}
