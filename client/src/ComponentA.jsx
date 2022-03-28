import React, { useContext } from 'react';
import { DataContext } from './DataContext'
import ComponentB from './ComponentB';

const ComponentA = () => {
  
  const {userInfo, setUserInfo} = useContext(DataContext);

  return (
    <div>
      Component A
      <p><span>{userInfo.name}'s favorite color is </span>
      <span style={{color: userInfo.favColor}}>{userInfo.favColor}</span></p>

      <button onClick={() => {
        setUserInfo({
          ...userInfo, favColor: "green"
        })
      }}>
        Green?
      </button>
      <button onClick={() => {
        setUserInfo({
          ...userInfo, favColor: "blue"
        })
      }}>
        Blue?
      </button>
      <ComponentB />

    </div>
  );
};

export default ComponentA;