import React from 'react';

const SinglePicture = ({ picture }) => {
  const { pageURL, tags } = picture;
  return (
    <div>
      <img src={pageURL} alt="picture" />
      <p>{tags}</p>
    </div>
  );
};

export default SinglePicture;
