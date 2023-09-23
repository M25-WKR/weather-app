import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, 
    faSun, 
    faSmog, 
    IconDefinition, 
    faCloudRain, 
    faCloudShowersHeavy, 
    faCloudShowersWater, 
    faCloudBolt, 
    faSnowflake 
} from '@fortawesome/free-solid-svg-icons'

export interface Icon {
    icon: IconDefinition,
    code: Array<number>
}


const weatherIcon: Array<Icon> = [
    {icon: faSun, code: [0]},
    {icon: faCloud, code: [1, 2, 3]},
    {icon: faSmog, code: [45, 48]},
    {icon: faCloudRain, code: [51, 53, 55]},
    {icon: faCloudRain, code: [56, 57]},
    {icon: faCloudShowersHeavy, code: [61, 63, 65]},
    {icon: faCloudShowersHeavy, code: [66, 67]},
    {icon: faSnowflake, code: [71, 73, 75]},
    {icon: faSnowflake, code: [77]},
    {icon: faCloudShowersWater, code: [80, 81, 82]},
    {icon: faCloudShowersWater, code: [85, 86]},
    {icon: faCloudBolt, code: [95]},
    {icon: faCloudBolt, code: [96, 99]}
]

export default weatherIcon