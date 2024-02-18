import React from 'react';
import LineGraph from './LineGraph'; // Assuming LineGraph component is imported

const MobileGraph = () => (
  <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}> {/* Adjust max-width as needed */}
        <LineGraph width={800} height={300} />
      </div>
   
  </div>
);

export default MobileGraph;
