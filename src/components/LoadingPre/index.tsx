import React from 'react';
import Box from '@/components/Box';

const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        '.loading-indicator-wrapper': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '20px',

          '.loading-spinner': {
            display: 'flex',
            justifyContent: 'space-between',
            width: '16px',
            height: '16px',
            textAlign: 'center',
            fontsize: '10px',

            '> div': {
              height: '100%',
              width: '4px',
              backgroundColor: '#a6a6a6',
              opacity: 0.2,
              borderRadius: '#a6a6a6',
              animation: 'spinner-bounce 0.6s infinite ease-in-out',
              transformOrigin: 'center',
            },
            '.rect-two': {
              animationDelay: '0.15s',
            },
            '.rect-three': {
              animationDelay: '0.3s',
            },
          },
          '@keyframes spinner-bounce': {
            '0%,100%': {
              transform: 'scaleY(0.4)',
              opacity: 0.8,
            },
            '50%': {
              transform: 'scaleY(1)',
              opacity: 1,
            },
          },
        },
      }}
      className="loading-pre-box"
    >
      <div className="loading-indicator-wrapper">
        <div className="loading-spinner">
          <div className="rect-one" />
          <div className="rect-two" />
          <div className="rect-three" />
        </div>
      </div>
    </Box>
  );
};

export default LoadingIndicator;
