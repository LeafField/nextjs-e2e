import { cookies } from 'next/headers';
import type { Task } from '@prisma/client';
import TaskItem from './task-item';
import React from 'react';

const fetchTasks = async (token: string | undefined) => {
  const res = await fetch(
    `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/tasks`
        : `${process.env.NEXTAUTH_URL}.api/tasks`
    }`,
    {
      headers: {
        cookie: `next-auth.session-token=${token}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch in server');
  }
  const tasks: Task[] = await res.json();
  return tasks;
};

const TaskList = async () => {
  const nextCookies = cookies();
  const token = nextCookies.get('next-auth.session-token');
  const tasks = await fetchTasks(token?.value);
  return (
    <ul className="my-6 mx-3">
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
};

export default TaskList;
