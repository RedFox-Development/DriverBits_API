
const NORMAL = Object.freeze({READ: true, WRITE: false});

const HANDLER_MOBILE = Object.freeze({READ: true, WRITE: false});

const HANDLER_WEB = Object.freeze({READ: true, WRITE: true});

const MANAGER_WEB = Object.freeze({READ: true, WRITE: true, MANAGE: true});

const HEADLESS = Object.freeze({READ: true, WRITE: true});

module.exports = {
  NORMAL,
  HANDLER_MOBILE,
  HANDLER_WEB,
  MANAGER_WEB,
  HEADLESS
};