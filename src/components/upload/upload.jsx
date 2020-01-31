import React, { useState } from 'react';
import './upload.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { mainColors5 as mainColors } from '../../modules/main-colors';
import { checkUserSignInFromDB } from '../../modules/db-manager';


function Upload({initialCount}) {
    const [count, setCount] = useState(0);
    return (
      <>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
        Count: {count}
      </>
    );
  }

export default Upload;