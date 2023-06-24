import { FC, ReactNode, Suspense } from 'react';
import Spinner from '../components/spinner';
import TaskEdit from '../components/task-edit';
import TaskList from '../components/task-list';

type Props = {
  children: ReactNode;
};

const TaskCrudLayout: FC<Props> = ({ children }) => {
  return (
    <section className="flex">
      <aside className="h-[calc(100vh - 64px)] w-1/4 bg-gray-200">
        <TaskEdit />
        <Suspense fallback={<Spinner />}>
          <TaskList />
        </Suspense>
      </aside>
      <main className="flex flex-1 justify-center">{children}</main>
    </section>
  );
};

export default TaskCrudLayout;
