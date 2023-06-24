import prisma from '.';
import type {
  CreateTaskInput,
  TaskIdInput,
  UpdateTaskInput,
} from '../../schema/task';

export async function getTasks(userId: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return { tasks };
  } catch (error: any) {
    return { error };
  }
}

export async function createTask(task: CreateTaskInput, userId: string) {
  try {
    const createdTask = await prisma.task.create({
      data: {
        ...task,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return { task: createdTask };
  } catch (error: any) {
    return { error };
  }
}

export async function getTaskById({ taskId }: TaskIdInput) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    return { task };
  } catch (error: any) {
    return { error };
  }
}

export async function deleteTask({ taskId }: TaskIdInput) {
  try {
    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    return { task };
  } catch (error: any) {
    return { error };
  }
}

export async function updateTask(
  { taskId }: TaskIdInput,
  task: UpdateTaskInput
) {
  try {
    const updateTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...task,
      },
    });
    return { task: updateTask };
  } catch (error: any) {
    return { error };
  }
}
