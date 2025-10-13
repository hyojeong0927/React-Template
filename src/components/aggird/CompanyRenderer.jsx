import React from 'react';

const CompanyRenderer = React.memo(({ value }) => {
  if (!value) return null;

  let hostname = '';
  try {
    hostname = new URL(value).hostname;
  } catch {
    hostname = value;
  }

  return (
    <a href={value} target="_blank" rel="noopener noreferrer">
      {hostname}
    </a>
  );
});

CompanyRenderer.displayName = 'CompanyRenderer';
export default CompanyRenderer;
