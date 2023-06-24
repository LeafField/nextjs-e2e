'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import type { Task } from '@prisma/client';
import useStore from '../../store';
import React, { FC } from 'react';

type Props = {
  task: Task;
};

const TaskItem: FC<Props> = ({ task }) => {
  const router = useRouter();
  const updateEditedTask = useStore((store) => store.updatedEditedTask);
  const resetEditedTask = useStore((store) => store.resetEditedTask);

  const updateTaskHandler = async (data: {
    id: string;
    completed: boolean;
  }) => {
    await fetch(`/api/tasks/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: data.completed }),
    });
    router.refresh();
    resetEditedTask();
  };

  const deleteTaskHandler = async (id: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    router.refresh();
  };

  return (
    <li className="my-2">
      <input
        type="checkbox"
        className="my-1"
        checked={task.completed}
        onChange={() => {
          updateTaskHandler({ ...task, completed: !task.completed });
        }}
      />
      <Link href={`task-crud/${task.id}`}>{task.title}</Link>
      <div className="float-right ml-20 flex">
        <PencilIcon
          data-testid="task-edit-icon"
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            updateEditedTask({
              id: task.id,
              completed: task.completed,
              title: task.title,
            });
          }}
        />
        <TrashIcon
          data-testid="task-delete-icon"
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteTaskHandler(task.id);
          }}
        />
      </div>
    </li>
  );
};

export default TaskItem;
