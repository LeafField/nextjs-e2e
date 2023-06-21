'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const MonitorSession = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    router.refresh();
  }, [session]);
  return null;
};

export default MonitorSession;
