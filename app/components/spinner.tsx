import React, { FC } from 'react';

type Props = {
  color?: string;
  width?: string;
  height?: string;
};

const Spinner: FC<Props> = ({
  color = 'border-blue-500',
  height = `h-8`,
  width = 'w-8',
}) => {
  return (
    <div className="m-2 flex justify-center">
      <div
        className={`${height} ${width} ${color} animate-spin rounded-full border-2 border-t-transparent`}
      ></div>
    </div>
  );
};

export default Spinner;
