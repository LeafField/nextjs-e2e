import { chromium } from '@playwright/test';
import path from 'path';
import prisma from '../../lib/prisma';

export default async function globalConfig() {
  const storagePath = path.resolve(__dirname, './storageState.json');
  const date = new Date();
  const sessionToken = '1868f7c1-4840-455f-98d1-67c58544d1e1';

  await prisma.user.upsert({
    where: {
      email: 'udemy@test.com',
    },
    create: {
      name: 'userA',
      email: 'udemy@test.com',
      sessions: {
        create: {
          expires: new Date(
            date.getFullYear(),
            date.getMonth() + 6,
            date.getDate()
          ),
          sessionToken,
        },
      },
      accounts: {
        create: {
          type: 'oauth',
          provider: 'github',
          providerAccountId: '123456',
          access_token: 'gho_kXLy7r1B0J1NAvUN3HIFI1FmI1LDlt34hcgT',
          token_type: 'bearer',
          scope: 'read:user,user:email',
        },
      },
    },
    update: {},
  });
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      expires: Math.round((Date.now() + 86400000 * 1) / 1000),
      sameSite: 'Lax',
      httpOnly: true,
    },
  ]);
  await context.storageState({ path: storagePath });
  await browser.close();
}
