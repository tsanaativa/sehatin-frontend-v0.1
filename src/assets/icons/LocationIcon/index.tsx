import React from 'react';

type LocationIconProps = {
  width?: number;
  height?: number;
};

const LocationIcon = ({ width = 20, height = 25 }: LocationIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 20 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10.0821C0 4.50654 4.52221 0 9.99229 0C15.4778 0 20 4.50654 20 10.0821C20 12.8917 19.0082 15.5002 17.3759 17.711C15.5751 20.1497 13.3555 22.2745 10.8571 23.9423C10.2853 24.3278 9.76926 24.3569 9.14171 23.9423C6.6291 22.2745 4.40951 20.1497 2.62412 17.711C0.990569 15.5002 0 12.8917 0 10.0821ZM6.69922 10.3961C6.69922 12.2639 8.17855 13.733 9.99241 13.733C11.8075 13.733 13.301 12.2639 13.301 10.3961C13.301 8.54281 11.8075 7.00225 9.99241 7.00225C8.17855 7.00225 6.69922 8.54281 6.69922 10.3961Z"
        fill="#007279"
      />
    </svg>
  );
};

export default LocationIcon;
