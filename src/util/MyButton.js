import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

export default ({children,onClick,tip,btnClassName,tipClassName})=>(
    <Tooltip title={tip} btnClassName={tipClassName} placement="top">
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)