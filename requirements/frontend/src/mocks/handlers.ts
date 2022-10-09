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

  rest.get(
    `${import.meta.env.VITE_BACKEND_EP}/channel/totalList`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          all: [
            {
              roomId: 1,
              title: '모든 채팅',
              owner: 'jeongble',
              userCount: 10,
              lock: true,
            },
            {
              roomId: 201,
              title: '자함을 국회로!!!!!!!',
              owner: 'jaham',
              userCount: 99,
              lock: false,
            },
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              owner: 'cjeon',
              userCount: 10,
              lock: false,
            },
            {
              roomId: 404,
              title: 'ljeongin의 minishell은 언제 끝날 것인가',
              owner: 'rjeongin',
              userCount: 44,
              lock: true,
            },
          ],
          joined: [
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              owner: 'cjeon',
              userCount: 10,
              lock: false,
            },
            {
              roomId: 404,
              title: 'ljeongin의 minishell은 언제 끝날 것인가',
              owner: 'rjeongin',
              userCount: 44,
              lock: true,
            },
          ],
          dm: [
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              owner: 'cjeon',
              userCount: 10,
              lock: false,
            },
          ],
        }),
      );
    },
  ),
];
