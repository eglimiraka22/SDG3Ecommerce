import React from 'react';

const FormattedDate = ({ isoDate }) => {
  const formatIsoDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return <span>{formatIsoDate(isoDate)}</span>;
};

export default FormattedDate;
