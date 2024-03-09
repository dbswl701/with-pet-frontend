import { http } from 'msw';
// import people from './dummy.json';

// async function sleep(timeout) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// }

// const handlers = [
//   rest.get('/people', async (req, res, ctx) => {
//     await sleep(200);

//     return res(ctx.status(200), ctx.json(people));
//   }),
//   rest.post('/people', async (req, res, ctx) => {
//     await sleep(200);
//     people.push({
//       id: '345',
//       name: 'son',
//       country: 'asia',
//       lang: 'php',
//     });

//     return res(ctx.status(201), ctx.json(people));
//   }),
// ];

export const handlers = [
  // By calling "http.get()" we're instructing MSW
  // to capture all outgoing "GET /posts" requests
  // and execute the given response resolver when they
  // happen.
  http.get('/posts', () => {
    // Response resolver allows you to react to captured requests,
    // respond with mock responses or passthrough requests entirely.
    // For now, let's just print a message to the console.
    console.log('Captured a "GET /posts" request');
  }),
];

export default handlers;
