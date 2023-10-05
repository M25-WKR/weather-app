import { styled, css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Weather } from "@/app/Models/Weather";
import { useEffect, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import weatherIcon, { Icon } from "../WeatherCodes";

interface IconProps {
    weather?: Weather | undefined
    displayDay?: number | undefined
}

function Icon({weather, displayDay}: IconProps) {
    
    const [icon, setIcon] = useState<IconDefinition | undefined>(undefined)

    useEffect(() => {
        const foundIcon = weatherIcon?.find?.((icon:Icon) => {
          if(icon?.code?.includes(Number(weather?.daily?.weathercode[displayDay ?? 0]))) return icon
        })
        setIcon(foundIcon?.icon)
      }, [weather, displayDay])

    return (
        <>
            { icon && <IconContainer>
                <StyledIcon icon={icon}/>
            </IconContainer>}
        </>
    )
}

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 100px;
    color: white;
`

export default Icon;