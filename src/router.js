const _ = require('lodash');
const Joi = require('joi');
const validate = require('express-validation');
const express = require('express');
const pdf = require('./http/pdf-http');
const image = require('./http/image-http');
const config = require('./config');
const logger = require('./util/logger')(__filename);
const { renderQueryParams, renderBodyParams } = require('./util/validation');

function createRouter() {
  const router = express.Router();
  const getRenderSchema = {
    query: renderQueryParams,
    options: {
      allowUnknownBody: false,
      allowUnknownQuery: false,
    },
  };
  router.get('/api/pdf', validate(getRenderSchema), pdf.getRender);
  router.get('/api/image', validate(getRenderSchema), image.getRender);

  const postRenderSchema = {
    body: renderBodyParams,
    options: {
      allowUnknownBody: false,
      allowUnknownQuery: false,
    },
  };
  router.post('/api/pdf', validate(postRenderSchema), pdf.postRender);
  router.post('/api/image', image.postRender);
  

  return router;
}

module.exports = createRouter;
