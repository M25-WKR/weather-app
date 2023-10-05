import { styled } from "styled-components";

interface DaysProps {
    days?: Array<object> | undefined
    displayDay?: number | undefined
    setDisplayDay?: Function | undefined
}

interface StyledDayProps {
    $currentDay?: boolean
}

function Days({days, displayDay, setDisplayDay}: DaysProps) {

    const daysArray = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thur',
        'Fri',
        'Sat',
    ]


    return (
       <StyledDaysContainer>
            {days?.map?.((day:any, dayIndex:number) => {
                return <StyledDay 
                            key={dayIndex} 
                            onClick={() => setDisplayDay?.(day?.day)}
                            $currentDay={day?.day === displayDay}>
                                {daysArray[Number(new Date(day?.date)?.getDay()?.toString?.())]}
                        </StyledDay>
            })}
       </StyledDaysContainer> 
    )
}

const StyledDaysContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 5px;
`

const StyledDay = styled.div<StyledDayProps>`
    background-color: ${({$currentDay}) => $currentDay ? '#073ff5' : '#000'};
    color: #FFF;
    padding: 5px 10px;
    min-width: 35px;
    text-align: center;
    font-size: 15px;
    border-radius: 5px;

    @media only screen and (max-width: 500px) {
        font-size: 11px;
        padding: 5px 0px
    }

    &:hover {
        background-color: #073ff5;
        cursor: pointer;
    }
`;

export default Days;