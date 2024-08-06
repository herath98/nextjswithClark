import React from 'react';

interface Props {
  message: { url: string };
}

const Image: React.FC<Props> = ({ message }) => {
  return <img src={message.url} height="300px" width="auto" />;
};

export default Image;