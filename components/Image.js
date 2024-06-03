<!-- components/Image.js -->
import React from 'react';

interface Props {
  message: { url: string };
}

const Image = ({ message }: Props) => {
  return <img src={message.url} height="300px" width="auto" />;
};

export default Image;