'use client';

import React from 'react';

const Error = ({ error }: { error?: Error }) => {
  return (
    <div>
      <p className="mt-6 text-center text-red-500">
        Data fetching in server failed
      </p>
    </div>
  );
};

export default Error;
