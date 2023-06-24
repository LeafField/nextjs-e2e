import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Task } from '@prisma/client';
import { format } from 'date-fns';
import type { TaskIdInput } from '../../../schema/task';
import { FC } from 'react';

type PageProps = {
  params: TaskIdInput;
};

const fetchSingleTask = async (
  data: { token: string | undefined } & TaskIdInput
) => {
  const res = await fetch(
    `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/tasks/${data.taskId}`
        : `${process.env.NEXTAUTH_URL}/api/tasks/${data.taskId}`
    }`,
    {
      headers: {
        cookies: `next-auth.session-token=${data.token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Faild to fetch data in server');
  }
  const task: Task = await res.json();
  return task;
};

const TaskDetailPage: FC<PageProps> = async ({ params }) => {
  const nextCookies = cookies();
  const token = nextCookies.get('next-auth.session-token');
  const task = await fetchSingleTask({
    taskId: params.taskId,
    token: token?.value,
  });

  if (!task) return notFound();

  return (
    <div className="mt-16 p-8">
      <p>Task ID: {task.id}</p>
      <p data-testId="title-dynamic-segment">Title: {task.title}</p>
      <p>Status: {task.completed ? 'done' : 'not yet'}</p>
      <p>
        createdAt:{' '}
        {task && format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm:ss')}
      </p>
    </div>
  );
};

export default TaskDetailPage;
