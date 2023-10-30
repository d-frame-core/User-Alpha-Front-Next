/** @format */

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface KYC2DetailsProps {
  title: string;
  values: any;
  dropdown: boolean;
  setState: any;
  state: string;
}

const KYC2Details: React.FC<KYC2DetailsProps> = ({
  title,
  setState,
  values,
  state,
  dropdown,
}) => {
  return (
    <div className='flex md:text-sm text-xl text-left md:my-3 my-6 items-center'>
      <div className='md:w-[25%] w-[50%]'>{title}</div>
      <div className='w-[5%]'>:</div>
      <div className='w-[50%] flex items-center justify-center'>
        {dropdown ? (
          <FormControl
            className='w-full text-xs h-10'
            style={{
              background: 'white',
              borderRadius: '10px',
            }}>
            <InputLabel
              id={`${title}-label`}
              className='flex justify-center items-start p-0 text-sm -mt-2'>
              {title}
            </InputLabel>
            <Select
              labelId={`${title}-label`}
              id={`${title}`}
              value={state}
              className='h-10 '
              label={title}
              onChange={(e) => setState(e.target.value as string)}>
              {values.map((value: any, index: number) => (
                <MenuItem
                  key={index}
                  value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <input
            className='rounded-lg w-full px-4 py-2 border-none outline-none'
            onChange={(e) => setState(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default KYC2Details;
