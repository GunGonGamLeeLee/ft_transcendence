import { rest } from 'msw';

export const handlers = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_EP}/channel/users`,
    (req, res, ctx) => {
      const param = req.url.searchParams;
      const id = param.get('roomId');
      return res(
        ctx.status(200),
        ctx.json([
          {
            uid: 99945,
            displayName: 'jaham',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 1111,
            role: 'owner',
            banned: false,
            muted: false,
          },
          {
            uid: 2,
            displayName: 'jeongble',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 4096,
            role: 'admin',
            banned: false,
            muted: false,
          },
          {
            uid: 3,
            displayName: 'yeju',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 2048,
            role: 'user',
            banned: false,
            muted: false,
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
              title: 'example chat room title',
              ownerId: 112230,
              ownerDisplayName: 'jeongble',
              userCount: 10,
              lock: true,
              private: false,
            },
            {
              roomId: 201,
              title: '자함을 국회로!!!!!!!',
              ownerId: 99945,
              ownerDisplayName: 'jaham',
              userCount: 99,
              lock: false,
              private: true,
            },
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              ownerId: 99,
              ownerDisplayName: 'cjeon',
              userCount: 10,
              lock: false,
              private: false,
            },
            {
              roomId: 404,
              title: 'ljeongin의 minishell은 언제 끝날 것인가',
              ownerId: 77,
              ownerDisplayName: 'rjeongin',
              userCount: 44,
              lock: true,
              private: false,
            },
            {
              roomId: 'channel1',
              title: 'example chat room title',
              ownerId: 112230,
              ownerDisplayName: 'jeongble',
              userCount: 10,
              lock: true,
              private: false,
            },
            {
              roomId: 201,
              title: '자함을 국회로!!!!!!!',
              ownerId: 99945,
              ownerDisplayName: 'jaham',
              userCount: 99,
              lock: false,
              private: true,
            },
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              ownerId: 99,
              ownerDisplayName: 'cjeon',
              userCount: 10,
              lock: false,
              private: false,
            },
            {
              roomId: 404,
              title: 'ljeongin의 minishell은 언제 끝날 것인가',
              ownerId: 77,
              ownerDisplayName: 'rjeongin',
              userCount: 44,
              lock: true,
              private: false,
            },
            {
              roomId: 1,
              title: 'example chat room title',
              ownerId: 112230,
              ownerDisplayName: 'jeongble',
              userCount: 10,
              lock: true,
              private: false,
            },
            {
              roomId: 201,
              title: '자함을 국회로!!!!!!!',
              ownerId: 99945,
              ownerDisplayName: 'jaham',
              userCount: 99,
              lock: false,
              private: true,
            },
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              ownerId: 99,
              ownerDisplayName: 'cjeon',
              userCount: 10,
              lock: false,
              private: false,
            },
            {
              roomId: 404,
              title: 'ljeongin의 minishell은 언제 끝날 것인가',
              ownerId: 77,
              ownerDisplayName: 'rjeongin',
              userCount: 44,
              lock: true,
              private: false,
            },
          ],
          joined: [
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              ownerId: 0,
              ownerDisplayName: 'cjeon',
              userCount: 10,
              lock: false,
              private: false,
            },
            {
              roomId: 404,
              title: 'ljeongin의 minishell은 언제 끝날 것인가',
              ownerId: 99,
              ownerDisplayName: 'rjeongin',
              userCount: 44,
              lock: true,
              private: false,
            },
          ],
          dm: [
            {
              roomId: 200,
              userId: 9,
              userDisplayName: 'cjeon',
            },
          ],
        }),
      );
    },
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_EP}/channel/auth`,
    (req, res, ctx) => {
      return res(ctx.status(200));
    },
  ),
  rest.post(`${import.meta.env.VITE_BACKEND_EP}/channel`, (req, res, ctx) => {
    req.json().then((data) => {
      const { title, mode, password } = data;
      console.log(
        `[MSW] request create room, title: ${title}, mdoe: ${mode}, password: ${password}`,
      );
    });

    return res(
      ctx.status(201),
      ctx.json({
        roomId: 10,
        title: 'title',
        ownerId: 99945,
        ownerDisplayName: 'jaham',
        userCount: 1,
        lock: false,
      }),
    );
  }),
];
