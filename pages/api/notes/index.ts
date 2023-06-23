import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { getNotes } from '../../../lib/prisma/notes';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method === 'GET') {
    if (!session) {
      return res.status(401).json({
        error: 'You must sign in no access this endpoint',
      });
    } else {
      try {
        const { error, notes } = await getNotes();
        if (error) {
          throw new Error(error);
        }
        return res.status(200).json(notes);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} is not allowd`);
};

export default handler;
