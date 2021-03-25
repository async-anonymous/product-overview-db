// import http from 'k6/http';
// import { sleep } from 'k6';

// export default function () {
//   http.get('http://3.142.191.146');
//   sleep(1);
// }

import http from 'k6/http';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
      maxVUs: 2500,
    },
  },
};

export default function () {
  http.get('http://3.142.191.146');
}