import { Weather } from "@/app/Models/Weather";
import { faWind, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

interface AttributeProps {
    city?: string
    country?: string
    weather?: Weather | undefined
}

function Attributes({city, country, weather}: AttributeProps) {
    return (
        <StyledAttributesContainer>
            <StyledCity>{city}, {country}</StyledCity>
                {weather && 
                    <StyledAttributesWrapper>
                        <StyledPrecipitationContainer>
                            <StyledPrecipitationIcon icon={faDroplet}/>
                            <StyledPrecipitationValue>{Math?.floor?.(Number?.(weather?.daily?.precipitation_probability_mean?.[0]))}</StyledPrecipitationValue>
                            <StyledPrecipitationUnit>{weather?.daily_units?.precipitation_probability_mean}</StyledPrecipitationUnit>
                        </StyledPrecipitationContainer>
                        <StyledWindContainer>
                            <StyledWindIcon icon={faWind}/>
                            <StyledWindValue>{Math?.floor?.(Number?.(weather?.daily?.windspeed_10m_max?.[0]))}</StyledWindValue>
                            <StyledWindUnit>{weather?.daily_units?.windspeed_10m_max}</StyledWindUnit>
                        </StyledWindContainer>
                    </StyledAttributesWrapper>
                }
        </StyledAttributesContainer>
    )
}

const StyledAttributesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
`;

const StyledCity = styled.span`
    font-size: 35px;
    color: white;
    text-align: center;
`;

const StyledAttributesWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 75px;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 500px) {
        width: fit-content
    }
`;

const StyledWindContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const StyledWindValue = styled.div`
    margin-right: 5px;
    font-weight: bold;
    font-size: 25px;
`

const StyledWindUnit = styled.div`
    font-size: 20px;
`

const StyledWindIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 25px;
`;

const StyledPrecipitationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const StyledPrecipitationValue = styled.div`
    margin-right: 5px;
    font-weight: bold;
    font-size: 25px;
`

const StyledPrecipitationUnit = styled.div`
    font-size: 20px;
`

const StyledPrecipitationIcon = styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 25px;
`;

export default Attributes;