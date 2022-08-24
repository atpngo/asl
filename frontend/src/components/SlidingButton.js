import styled from "styled-components";

function SlidingButton(props)
{
    const Button = styled.button`
        cursor: default;
        -webkit-user-select: none; 
        -moz-user-select: none; 
        -ms-user-select: none; 
        user-select: none;
        text-align: center;
        border-width: 5px;
        border-radius: 1rem;
        max-width: 250px;
        padding: 0.75rem;
        width: 250px;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        color: ${props.color};
        border-color: ${props.color};
        background: -webkit-linear-gradient(0deg, transparent 50%, ${props.color} 50%);
        background-size: 500px 100%;
        transition: 0.6s;

        &:hover {
            background-position: 250px 0;
            color: white;
            transform: scale(1.1);

        }
        
        &:active {
            transform: scale(0.95);
            -webkit-transition: transform 0.05s ease-in-out;
        }
    `

    const Label = styled.p`
        font-size: 1.25rem;
        line-height: 1.75rem;
    `

    return <Button onClick={props.onClick}>
                <Label>
                    {props.children}
                </Label>
            </Button>
}

export default SlidingButton;
