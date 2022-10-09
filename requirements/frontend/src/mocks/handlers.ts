import { rest } from 'msw';

export const handlers = [
  rest.get(`${import.meta.env.VITE_BACKEND_EP}/users/me`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 99945,
        displayName: 'jaham',
        imgUri:
          'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
        rating: 2048,
      }),
    );
  }),

  rest.get(
    `${import.meta.env.VITE_BACKEND_EP}/users/friend`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            displayName: 'jaham',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 2048,
            status: 'online',
          },
          {
            id: 2,
            displayName: 'jeongble',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 1024,
            status: 'offline',
          },
          {
            id: 3,
            displayName: 'yeju',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 4096,
            status: 'gaming',
          },
        ]),
      );
    },
  ),

  rest.get(`${import.meta.env.VITE_BACKEND_EP}/users/rank`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 2,
          displayName: 'jeongble',
          imgUri:
            'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
          rating: 4096,
        },
        {
          id: 3,
          displayName: 'yeju',
          imgUri:
            'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
          rating: 2048,
        },
        {
          id: 1,
          displayName: 'jaham',
          imgUri:
            'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
          rating: 1024,
        },
      ]),
    );
  }),

  rest.get(
    `${import.meta.env.VITE_BACKEND_EP}/channel/users`,
    (req, res, ctx) => {
      const param = req.url.searchParams;
      const id = param.get('roomId');
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 2,
            displayName: 'jeongble',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 4096,
            role: 'admin',
          },
          {
            id: 3,
            displayName: 'yeju',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 2048,
            role: 'op',
          },
          {
            id: 1,
            displayName: 'jaham',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 1111,
            role: 'owner',
          },
        ]),
      );
    },
  ),
];
