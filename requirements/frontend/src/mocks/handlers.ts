import { rest } from 'msw';

export const handlers = [
  rest.get(`${import.meta.env.VITE_BACKEND_EP}/users/me`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        uid: 99945,
        displayName: 'jaham',
        imgUri:
          'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
        rating: 2048,
        mfaNeed: false,
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
            uid: 2,
            displayName: 'jeongble',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 1024,
            status: 'offline',
          },
        ]),
      );
    },
  ),

  // rest.get(`${import.meta.env.VITE_BACKEND_EP}/users/rank`, (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json([
  //       {
  //         uid: 2,
  //         displayName: 'jeongble',
  //         imgUri:
  //           'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
  //         rating: 4096,
  //         status: 'offline',
  //       },
  //       {
  //         uid: 3,
  //         displayName: 'yeju',
  //         imgUri:
  //           'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
  //         rating: 2048,
  //         status: 'online',
  //       },
  //       {
  //         uid: 99945,
  //         displayName: 'jaham',
  //         imgUri:
  //           'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
  //         rating: 1024,
  //         status: 'online',
  //       },
  //     ]),
  //   );
  // }),

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
              ownerId: 99945,
              ownerName: 'jeongble',
              userCount: 10,
              lock: true,
              private: false,
            },
            {
              roomId: 201,
              title: '자함을 국회로!!!!!!!',
              ownerId: 99945,
              ownerName: 'jaham',
              userCount: 99,
              lock: false,
              private: true,
            },
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              ownerId: 99,
              ownerName: 'cjeon',
              userCount: 10,
              lock: false,
              private: false,
            },
            {
              roomId: 404,
              title: 'ljeongin의 minishell은 언제 끝날 것인가',
              ownerId: 77,
              ownerName: 'rjeongin',
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
              ownerName: 'cjeon',
              userCount: 10,
              lock: false,
              private: false,
            },
            {
              roomId: 404,
              title: 'ljeongin의 minishell은 언제 끝날 것인가',
              ownerId: 99,
              ownerName: 'rjeongin',
              userCount: 44,
              lock: true,
              private: false,
            },
          ],
          dm: [
            {
              roomId: 200,
              title: 'cjeon의 Haskell 강의',
              ownerId: 9,
              ownerName: 'cjeon',
              userCount: 10,
              lock: false,
              private: false,
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
  rest.post(
    `${import.meta.env.VITE_BACKEND_EP}/users/follow`,
    (req, res, ctx) => {
      req.json().then((res) => {
        console.log(`[MSW] request follow, uid: ${res.uid}`);
      });
      return res(ctx.status(201));
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_BACKEND_EP}/users/follow`,
    (req, res, ctx) => {
      req.json().then((res) => {
        console.log(`[MSW] request unfollow, uid: ${res.uid}`);
      });
      return res(ctx.status(200));
    },
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_EP}/users/blocklist`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            uid: 1093,
            displayName: 'blockedUser',
            imgUri:
              'https://ca.slack-edge.com/T039P7U66-U01GAGE28SE-4b0009a95b5a-512',
            rating: 2048,
            status: 'online',
          },
        ]),
      );
    },
  ),
  rest.post(
    `${import.meta.env.VITE_BACKEND_EP}/users/block`,
    (req, res, ctx) => {
      req.json().then((res) => {
        console.log(`[MSW] request block, uid: ${res.uid}`);
      });
      return res(ctx.status(201));
    },
  ),
  rest.delete(
    `${import.meta.env.VITE_BACKEND_EP}/users/block`,
    (req, res, ctx) => {
      req.json().then((res) => {
        console.log(`[MSW] request unblock, id: ${res.uid}`);
      });
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
        ownerName: 'jaham',
        userCount: 1,
        lock: false,
      }),
    );
  }),
  // rest.post(
  //   `${import.meta.env.VITE_BACKEND_EP}/users/namecheck`,
  //   (req, res, ctx) => {
  //     req.json().then((res) => {
  //       console.log(`[MSW] request namecheck, name: ${res.displayName}`);
  //     });

  //     return res(ctx.status(201));
  //   },
  // ),
  // rest.post(`${import.meta.env.VITE_BACKEND_EP}/users/me`, (req, res, ctx) => {
  //   req.json().then((res) => {
  //     console.log(
  //       `[MSW] request change profile, name: ${res.displayName} img: ${res.imgUri} mfa: ${res.isRequiredMfa}`,
  //     );
  //   });

  //   return res(
  //     ctx.status(201),
  //     ctx.json({
  //       uid: 99945,
  //       displayName: 'newName',
  //       imgUri: 'https://avatars.githubusercontent.com/u/76723089?s=80&v=4',
  //       rating: 2048,
  //       status: 'online',
  //     }),
  //   );
  // }),
  // rest.post(`${import.meta.env.VITE_BACKEND_EP}/login/otp`, (req, res, ctx) => {
  //   console.log(`[MSW] request otp auth`);
  //   return res(ctx.status(201));
  // }),
];
