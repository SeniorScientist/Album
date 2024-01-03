/* Swagger configuration */
// const options = {
//   openapi: 'OpenAPI 3', // Enable/Disable OpenAPI. By default is null
//   language: 'en-US', // Change response language. By default is 'en-US'
//   disableLogs: false, // Enable/Disable logs. By default is false
//   autoHeaders: false, // Enable/Disable automatic headers capture. By default is true
//   autoQuery: false, // Enable/Disable automatic query capture. By default is true
//   autoBody: false, // Enable/Disable automatic body capture. By default is true
// }

import swaggerAutogen from 'swagger-autogen'
import { ErrorCode } from 'types/error.type'

const doc = {
  info: {
    version: '1.0.0', // by default: '1.0.0'
    title: 'Album Apis', // by default: 'REST API'
    description: 'API for Managing queue calls', // by default: ''
    contact: {
      name: 'API Support',
      email: 'f.nowak.w@gmail.com',
    },
  },
  host: process.env.SWAGGER_HOST, // by default: 'localhost:3000'
  basePath: '/api.docs/', // by default: '/'
  schemes: ['http'], // by default: ['http']
  consumes: ['application/json'], // by default: ['application/json']
  produces: ['application/json'], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: 'Album CRUD', // Tag name
      description: 'Queue related apis', // Tag description
    }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {
    helathResponse: {
      code: 200,
      message: 'success',
    },
    'errorResponse.400': {
      code: ErrorCode.BAD_REQUEST,
      message: 'Bad Request',
    },
    'errorResponse.403': {
      code: ErrorCode.FORBIDDEN,
      message: 'Forbidden Request',
    },
    'errorResponse.404': {
      code: ErrorCode.NOT_FOUND,
      message: 'Not found',
    },
    'errorResponse.500': {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    },
  }, // by default: empty object (Swagger 2.0)
}

const outputFile = './docs/swagger.json'
const endpointsFiles = ['../server.ts', '../routes/*.ts']

/* NOTE: if you use the express Router, you must pass in the 
 'endpointsFiles' only the root file where the route starts,
 such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc)

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });
