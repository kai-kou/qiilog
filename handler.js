const awsServerlessExpress = require('aws-serverless-express')
const app = require('./server')

const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/manifest+json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/x-icon',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
]
const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes)

module.exports.render = (event, context) => awsServerlessExpress.proxy(server, event, context)