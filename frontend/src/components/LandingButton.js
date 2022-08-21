import React, { useState } from "react";

function LandingButton(props)
{
    // props: color, children

    const [hover, setHover] = useState(false);

    const hoverStyle = {
        borderColor: props.color,
        color: 'white',
        backgroundImage: `linear-gradient(to left, transparent 50%, ${props.color} 50%)`,
        backgroundSize: '200%',
        backgroundPosition: '0%'
    }

    const style = {
        borderColor: props.color,
        color: props.color,
        backgroundPosition: '100%'
    }

    return(
        <button className="landing-btn" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={hover ? hoverStyle : style}>
            <p className="text-xl">{props.children}</p>
        </button>
    )
}

export default LandingButton;
