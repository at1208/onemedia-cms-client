import React from 'react';
import { Avatar } from '@material-ui/core';

export const avatarStyle = (index, size, textSize) => {
  if (index % 5 === 0) {
    return {
      backgroundColor: '#FCF0EF',
      fontSize:`${textSize}px`,
      textTransform:"capitalize",
      // margin:"0px 3px 0px 3px",
      margin:"0px -7px",
      color: '#E66E68',
      borderRadius: "50%",
      width: `${size}px`,
      height:`${size}px`,
      objectFit: "cover",
    };
  } else if (index % 3 === 0) {
    return {
      backgroundColor: '#FFFABB',
      fontSize:`${textSize}px`,
      textTransform:"capitalize",
      // margin:"0px 3px 0px 3px",
      margin:"0px -7px",
      color: '#FFD502',
      borderRadius: "50%",
      width: `${size}px`,
      height:`${size}px`,
      objectFit: "cover",
    };
  } else if (index % 2 === 0) {
    return {
      backgroundColor: '#CAFFE6',
      fontSize:`${textSize}px`,
      textTransform:"uppercase",
      // margin:"0px 3px 0px 3px",
      margin:"0px -7px",
      color: '#34F89C',
      borderRadius: "50%",
      width: `${size}px`,
      height:`${size}px`,
      objectFit: "cover",
    };
  } else if (index % 1 === 0) {
    return {
      backgroundColor: '#CAF0FF',
      fontSize:`${textSize}px`,
      // margin:"0px 3px 0px 3px",
      margin:"0px -7px",
      textTransform:"capitalize",
      color: '#3BC8FF',
      borderRadius: "50%",
      width: `${size}px`,
      height:`${size}px`,
      objectFit: "cover",
    };
  }
};



const AvatarContainer = ({ name, src, size, textSize }) => {
  if(name){
    let naam = name.split(" ");
    return <>
            <Avatar style={avatarStyle(name.length, size, textSize)} variant="square" src={src}>
              {naam[0][0]}{naam[1][0]}
            </Avatar>
           </>
  }else{
    return <>
          </>
  }
}

export default AvatarContainer;
