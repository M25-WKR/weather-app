import { Weather } from "@/app/Models/Weather";
import { styled } from "styled-components";

interface TemperatureProps {
    weather?: Weather | undefined
}

function Temperature({weather}: TemperatureProps) {

    

    return (
        <StyledTemperatureContainer>
            { weather && 
                <>
                    <StyledTemperatureValue>{Math?.floor?.(Number?.(weather?.daily?.apparent_temperature_max[0]))}</StyledTemperatureValue>
                    <StyledTemperatureUnit>{weather?.daily_units?.apparent_temperature_max}</StyledTemperatureUnit>
                </>
            }
        </StyledTemperatureContainer>
    )
}

const StyledTemperatureContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const StyledTemperatureValue = styled.div`
    font-size: 45px;
    font-weight: bold;
    color: white;
`;

const StyledTemperatureUnit = styled.div`
    font-size: 30px;
    color: white;
`

export default Temperature