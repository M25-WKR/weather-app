import { styled, css } from "styled-components";
import axios, { AxiosResponse } from 'axios';
import { Locations, Location } from "../Models/Location";
import { useState, useEffect } from "react";

interface SearchProps {
    location?: Location | undefined
    setLocation?: Function | undefined
}

function Search({location, setLocation}: SearchProps) {

    const [locations, setLocations] = useState<Locations | undefined>(undefined);
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [search, setSearch] = useState<string | undefined>(undefined);


    async function getLocations(location:string | undefined) {
        await axios.get<Locations>(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`).then((response) => {
            setLocations(response?.data);
            setShowOptions(true)
          }).catch((error) => {
          })
    }

    function handleOnBlur(event:any) {
        if(!event?.relatedTarget || event?.relatedTarget?.parentElement?.id !== 'options_container') {
            setShowOptions(false)
        }
    }

    function handleEnterKeyPress (event:any, type:any, location?:Location) {
        if (event.key === 'Enter') {
            if(type === 'search') {
                getLocations(search)
            } else if(type === 'option' && location) {
                selectOption?.(location);
            }
        }
      };

    function selectOption(location:Location) {
        setLocation?.(location);
        setSearch(undefined);
        setLocations(undefined);
        setShowOptions(false);
    }

    return (
        <StyledSearchContainer>
            <StyledInputContainer>
                <StyledSearchInput $locations={locations} 
                type="text" 
                value={search ?? ''} 
                onKeyDown={(event:any) => handleEnterKeyPress(event, 'search')} 
                onFocus={() => setShowOptions(true)} 
                onBlur={(event:any) => handleOnBlur(event)} 
                onChange={(event: any) => setSearch(event?.target?.value)} 
                placeholder="Search City"/>
                {locations?.results?.length && showOptions && 
                    <StyledSearhOptionsContainer id={"options_container"} onBlur={(event:any) => handleOnBlur(event)}>
                        {locations?.results?.map?.((location: Location, locationIndex: number) => {
                            return <StyledSearchOption key={locationIndex} 
                                        tabIndex={0} 
                                        onKeyDown={(event:any) => handleEnterKeyPress(event, 'option', location)} 
                                        onClick={() => selectOption?.(location)}>
                                <span>{location?.name},</span>
                                {location?.admin1 && <span>{location?.admin1},</span>}
                                {location?.country && <span>{location?.country}</span>}
                            </StyledSearchOption>
                        })}
                    </StyledSearhOptionsContainer>
                }
            </StyledInputContainer>
            <StyledSearchButton onClick={() => getLocations(search)} 
                onKeyDown={(event:any) => handleEnterKeyPress(event, 'search')}>
                <StyledSearchIcon src="/search_icon.png"/>
            </StyledSearchButton>
        </StyledSearchContainer>
    )
}

const StyledSearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
`;

const StyledInputContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;

    @media only screen and (max-width: 500px) {
        width: 80%;
    }
`

const StyledSearchInput = styled.input<{$locations: any}>`
    outline: none;
    border: 1px solid grey;
    border-radius: 25px;
    background-color: #f2f2f2;
    padding: 15px;

    &::placeholder {
        color: grey;
    }

    &:focus-visible, &:hover {
        border: 1px solid #000;
    }

    ${({$locations}) => $locations?.results?.length > 0 && css`
    `}
`;

const StyledSearhOptionsContainer = styled.div`
    top: 50px;
    max-height: 350px;
    border-radius: 25px;
    background-color: #f2f2f2;
    overflow-y: scroll;
    border: 1px solid grey;
    width: 100%;

    scrollbar-width: none;
    -ms-overflow-style: none;
    position: absolute;

    &:hover, &:focus-within {
        border: 1px solid black;
    }

    &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`;

const StyledSearchOption = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    color: #000;

    &:hover, &:focus-visible {
        background-color: #073ff5;
        color: #fff;
        cursor: pointer;
    }

    &:not(:last-child) {
        border-bottom: 1px solid black;
    }

    &:first-child:hover, &:first-child:focus-visible {
        border-radius: 25px 25px 0px 0px;
    }

    &:last-child:hover, &:last-child:focus-visible {
        border-radius: 0px 0px 25px 25px;
    }
`;

const StyledSearchButton = styled.button`
    outline: none;
    border: none;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    cursor: pointer;

    &:focus-visible, &:hover {
        border: 1px solid #000;
    }

`;

const StyledSearchIcon = styled.img`
    width: 25px;
    height: 25px;
    outline: none;
`

export default Search;