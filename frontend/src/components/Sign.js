import React from "react";
import {ReactComponent as A} from '../alphabet/A.svg';
import {ReactComponent as B} from '../alphabet/B.svg';
import {ReactComponent as C} from '../alphabet/C.svg';
import {ReactComponent as D} from '../alphabet/D.svg';
import {ReactComponent as E} from '../alphabet/E.svg';
import {ReactComponent as F} from '../alphabet/F.svg';
import {ReactComponent as G} from '../alphabet/G.svg';
import {ReactComponent as H} from '../alphabet/H.svg';
import {ReactComponent as I} from '../alphabet/I.svg';
import {ReactComponent as J} from '../alphabet/J.svg';
import {ReactComponent as K} from '../alphabet/K.svg';
import {ReactComponent as L} from '../alphabet/L.svg';
import {ReactComponent as M} from '../alphabet/M.svg';
import {ReactComponent as N} from '../alphabet/N.svg';
import {ReactComponent as O} from '../alphabet/O.svg';
import {ReactComponent as P} from '../alphabet/P.svg';
import {ReactComponent as Q} from '../alphabet/Q.svg';
import {ReactComponent as R} from '../alphabet/R.svg';
import {ReactComponent as S} from '../alphabet/S.svg';
import {ReactComponent as T} from '../alphabet/T.svg';
import {ReactComponent as U} from '../alphabet/U.svg';
import {ReactComponent as V} from '../alphabet/V.svg';
import {ReactComponent as W} from '../alphabet/W.svg';
import {ReactComponent as X} from '../alphabet/X.svg';
import {ReactComponent as Y} from '../alphabet/Y.svg';
import {ReactComponent as Z} from '../alphabet/Z.svg';
import {ReactComponent as Number0} from '../alphabet/0.svg';
import {ReactComponent as Number1} from '../alphabet/1.svg';
import {ReactComponent as Number2} from '../alphabet/2.svg';
import {ReactComponent as Number3} from '../alphabet/3.svg';
import {ReactComponent as Number4} from '../alphabet/4.svg';
import {ReactComponent as Number5} from '../alphabet/5.svg';
import {ReactComponent as Number6} from '../alphabet/6.svg';
import {ReactComponent as Number7} from '../alphabet/7.svg';
import {ReactComponent as Number8} from '../alphabet/8.svg';
import {ReactComponent as Number9} from '../alphabet/9.svg';


function Sign({ value, size, color, className })
{   
    const dict = {
        'A' : <A fill={color}/>,
        'B' : <B fill={color}/>,
        'C' : <C fill={color}/>,
        'D' : <D fill={color}/>,
        'E' : <E fill={color}/>,
        'F' : <F fill={color}/>,
        'G' : <G fill={color}/>,
        'H' : <H fill={color}/>,
        'I' : <I fill={color}/>,
        'J' : <J fill={color}/>,
        'K' : <K fill={color}/>,
        'L' : <L fill={color}/>,
        'M' : <M fill={color}/>,
        'N' : <N fill={color}/>,
        'O' : <O fill={color}/>,
        'P' : <P fill={color}/>,
        'Q' : <Q fill={color}/>,
        'R' : <R fill={color}/>,
        'S' : <S fill={color}/>,
        'T' : <T fill={color}/>,
        'U' : <U fill={color}/>,
        'V' : <V fill={color}/>,
        'W' : <W fill={color}/>,
        'X' : <X fill={color}/>,
        'Y' : <Y fill={color}/>,
        'Z' : <Z fill={color}/>,
        '0' : <Number0 fill={color}/>,
        '1' : <Number1 fill={color}/>,
        '2' : <Number2 fill={color}/>,
        '3' : <Number3 fill={color}/>,
        '4' : <Number4 fill={color}/>,
        '5' : <Number5 fill={color}/>,
        '6' : <Number6 fill={color}/>,
        '7' : <Number7 fill={color}/>,
        '8' : <Number8 fill={color}/>,
        '9' : <Number9 fill={color}/>,
    }

    // let dimensions = size || '200px';

    return(
        // <div className={className} style={{width: size, height: size}}>
        <div className={className}>
            {dict[value]}
        </div>
    )
}

export default Sign;
