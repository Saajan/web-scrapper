const ex = require('../util/express');
const imageCore = require('../core/image-core');

const getRender = ex.createRoute((req, res) => {
  const opts = {
    url: req.query.url,
    scrollPage: req.query.scrollPage,
    emulateScreenMedia: req.query.emulateScreenMedia,
    waitFor: req.query.waitFor,
    viewport: {
      width: req.query['viewport.width'],
      height: req.query['viewport.height'],
      deviceScaleFactor: req.query['viewport.deviceScaleFactor'],
      isMobile: req.query['viewport.isMobile'],
      hasTouch: req.query['viewport.hasTouch'],
      isLandscape: req.query['viewport.isLandscape'],
    },
    goto: {
      timeout: req.query['goto.timeout'],
      waitUntil: req.query['goto.waitUntil'],
      networkIdleInflight: req.query['goto.networkIdleInflight'],
      networkIdleTimeout: req.query['goto.networkIdleTimeout'],
    }
  };

  return imageCore.render(opts)
    .then((data) => {
      res.set('content-type', 'image/png');
      res.send(data);
    });
});

const postRender = ex.createRoute((req, res) => {
  return imageCore.render(req.body)
    .then((data) => {
      res.set('content-type', 'image/png');
      res.send(data);
    });
});

module.exports = {
  getRender,
  postRender
};
