/** @format */

import React from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface KYCComponentProps {
  title: string;
  description: string;
  button: string;
}

const KYCComponent: React.FC<KYCComponentProps> = ({
  title,
  description,
  button,
}) => {
  const router = useRouter();
  const redirect = () => {
    router.push(`/${button}`);
  };
  return (
    <div className='flex items-center flex-col justify-center gap-1'>
      <div className='text-xl font-semibold'>{title}</div>
      <div>{description}</div>
      {button === 'kyc1' || button === 'kyc2' || button === 'kyc3' ? (
        <>
          <Button
            content={'Verify'}
            onClick={redirect}
          />
        </>
      ) : null}
    </div>
  );
};

export default KYCComponent;
