import React from 'react';

export default ({address}) => {
  const {title, body} = buildAddressName(address)
  return (
    <div>
      <div>{title}</div>
      <div>{body}</div>
    </div>
  )
}

const buildAddressName = (formattedAddress, addressComponents) => {
  const a = formattedAddress.split(",");
  const title = a[0];
  const body = a.slice(1, a.length).join(',');
  return {
    title,
    body,
  };
};