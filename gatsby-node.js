'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let getPublicJobList = (() => {
  var _ref = _asyncToGenerator(function* (handler) {
    return yield _awsAmplify.API.get('company', `/jobs/${handler}`);
  });

  return function getPublicJobList(_x) {
    return _ref.apply(this, arguments);
  };
})();

let fetchJobTypes = (() => {
  var _ref2 = _asyncToGenerator(function* (data) {
    return yield _awsAmplify.API.get('jobs', '/types', { headers: {} });
  });

  return function fetchJobTypes(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

let fetchCountryList = (() => {
  var _ref3 = _asyncToGenerator(function* () {
    return yield _awsAmplify.API.get('countryList', '');
  });

  return function fetchCountryList() {
    return _ref3.apply(this, arguments);
  };
})();

var _aws = require('./aws');

var _aws2 = _interopRequireDefault(_aws);

var _awsAmplify = require('aws-amplify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const crypto = require('crypto');
const axios = require('axios');

(0, _aws2.default)();

exports.sourceNodes = (() => {
  var _ref4 = _asyncToGenerator(function* ({ boundActionCreators: { createNode } }, { companyId }) {

    const fetchedCountries = yield fetchCountryList();
    const fetchedJobTypes = yield fetchJobTypes();
    const fetchedJobs = yield getPublicJobList(companyId);

    const countryIndex = fetchedCountries.data.reduce(function (obj, cur, i) {
      obj[cur.id] = cur;
      return obj;
    }, {});

    const jobTypeIndex = fetchedJobTypes.data.reduce(function (obj, cur, i) {
      obj[cur.id] = cur;
      return obj;
    }, {});

    const jobs = fetchedJobs.jobs.map(function (job) {
      job.jobType = jobTypeIndex[job.jobType] && jobTypeIndex[job.jobType].title || job.jobType;
      job.country = countryIndex[job.country] && countryIndex[job.country].title || job.country;

      return job;
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = jobs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const job = _step.value;

        job.id = job.jobId;
        const jsonString = JSON.stringify(job);
        const gatsbyNode = _extends({}, job, {
          children: [],
          parent: '__SOURCE__',
          internal: {
            type: 'MollyJob',
            content: jsonString,
            contentDigest: crypto.createHash('md5').update(jsonString).digest('hex')
          }
          // Insert data into gatsby
        });createNode(gatsbyNode);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  return function (_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
})();