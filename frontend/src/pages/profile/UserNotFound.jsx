import React from 'react';

export const UserNotFound = (props) => {
  return (
    <div className='flex items-center justify-center m-10 rounded-xl bg-[rgb(28,28,37)] w-full'>
        <p className='text-3xl text-slate-500'>{props.message}</p>
    </div>
  );
};