import React from "react";
// import * from '../alphabet';
import {ReactComponent as A} from '../alphabet/A.svg';

function Sign({ letter })
{
    return(
        <div style={{border: '1px solid red', width: '300px', height: '300px'}}>
            <A fill="blue" />
        </div>
    )
}

export default Sign;
