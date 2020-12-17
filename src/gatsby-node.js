import configAWS from './aws';
import { API } from 'aws-amplify';

const crypto = require('crypto')
const axios = require('axios')

configAWS();

async function getPublicJobList(handler) {
  return await API.get('company', `/jobs/${handler}`);
}

async function fetchJobTypes(data) {
  return await API.get('jobs', '/types', { headers: {} });
}

async function fetchCountryList() {
  return await API.get('countryList', '');
}

exports.sourceNodes = async ({ boundActionCreators: { createNode } }, { companyId }) => {

  const fetchedCountries = await fetchCountryList();
  const fetchedJobTypes = await fetchJobTypes();
  const fetchedJobs = await getPublicJobList(companyId);

  const countryIndex = fetchedCountries.data.reduce((obj, cur, i) => {
    obj[cur.id] = cur;
    return obj;
  }, {});

  const jobTypeIndex = fetchedJobTypes.data.reduce((obj, cur, i) => {
    obj[cur.id] = cur;
    return obj;
  }, {});

  const jobs = fetchedJobs.jobs.map(job => {
    job.jobType = jobTypeIndex[job.jobType] && jobTypeIndex[job.jobType].title || job.jobType;
    job.country = countryIndex[job.country] && countryIndex[job.country].title || job.country;

    return job;
  });

  for(const job of jobs) {
    job.id = job.jobId
    const jsonString = JSON.stringify(job)
    const gatsbyNode = {
      ...job,
      children: [],
      parent: '__SOURCE__',
      internal: {
        type: 'MollyJob',
        content: jsonString,
        contentDigest: crypto.createHash('md5').update(jsonString).digest('hex'),
      },
    }
    // Insert data into gatsby
    createNode(gatsbyNode)
  }
}
