import React from 'react';

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => {
  return <input ref={ref} type="search" {...props} />;
});
SearchInput.displayName = 'SearchInput';
