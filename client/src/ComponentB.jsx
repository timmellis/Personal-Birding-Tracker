import React, { useContext } from 'react';
import { DataContext } from './DataContext'

const ComponentB = () => {

  const {userInfo, setUserInfo, moreInfo} = useContext(DataContext);

  return (
    <div>
      
      <p style={{color: userInfo.favColor}}>
        This is coming from Component B: {moreInfo[0].name}
      </p>
    </div>
  );
};

export default ComponentB;