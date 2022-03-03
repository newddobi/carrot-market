import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "POST") {
    const {
      body: { receiverId },
      session: { user },
    } = req;
    const chatRoom = await client.chatRoom.create({
      data: {
        sender: {
          connect: {
            id: user?.id,
          },
        },
        receiver: {
          connect: {
            id: receiverId,
          },
        },
      },
    });
    console.log(chatRoom);
    res.json({
      ok: true,
      chatRoom,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
