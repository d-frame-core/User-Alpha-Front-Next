/** @format */
'use client';
import React, { useContext, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';
import { AppContext } from '@/context/Context';

interface AddTagsModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTagsModal: React.FC<AddTagsModalProps> = ({ open, onClose }) => {
  const { userData } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    // Define the functionality for the button click here
    console.log('Button clicked');
    // You can add your functionality here
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'>
      <DialogTitle>
        <div className='flex justify-between items-center pb-2 border-b-2 border-gray-200'>
          <div className='md:text-xl text-2xl font-semibold'>Your Tags</div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {userData && userData.tags.userTags.length > 1 && (
          <div className='mb-4 text-center flex justify-center items-center gap-3'>
            {userData.tags.dailyTags.map((item: any) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        )}
        {userData &&
          userData.tags &&
          userData.tags.userTags &&
          userData.tags.userTags.length < 5 && (
            <div>
              <div className='w-11/12 mx-auto text-center'>
                <input
                  type='text'
                  placeholder='Enter something'
                  value={inputValue}
                  onChange={handleInputChange}
                  className='border rounded-lg py-1 px-3 w-full'
                />
              </div>
              <div className='flex mt-4 justify-end'>
                <Button
                  content={'Perform Action'}
                  onClick={handleButtonClick}
                />
              </div>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default AddTagsModal;
