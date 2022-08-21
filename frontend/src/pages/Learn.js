import React from "react";
import MCQLetter from "../components/Questions/MCQLetter";

function Learn()
{
    return(
        <div>
            <MCQLetter answer="S" options={['Q', 'M', 'S', 'A']} variant="identify"/>
        </div>
    )
}

export default Learn;