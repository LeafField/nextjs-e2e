'use client';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Provider: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
