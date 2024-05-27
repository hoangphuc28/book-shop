import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor?: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, className, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={`text-gray-600 mb-2 block ${className}`} {...props}>
      {text}
    </label>
  );
};

export default Label;
