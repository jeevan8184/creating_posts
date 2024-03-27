import React from 'react';
import { TextField } from '@mui/material';

const Input = ({name,label,handleChange,type,fullWidth,autoFocus,handleShowPass}) => {
  return (
    <TextField 
      name={name}
      label={label}
      onChange={handleChange}
      variant='outlined'
      type={type}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      handleShowPass={handleShowPass}

    />
  )
}

export default Input