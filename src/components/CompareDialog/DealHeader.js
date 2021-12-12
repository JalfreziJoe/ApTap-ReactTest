import { Button } from '@mui/material';

import classes from './DealHeader.module.css';


const DealHeader = ({removeDeal, dealId, providerImage, providerName, dealName}) => {
    return (
        
        <div className={classes.container}>
            <div className={classes.remove}><Button variant="text" onClick={() => removeDeal(dealId)}>Remove</Button></div>
            <div className={classes.image}>
                <img src={providerImage} alt={providerName} />
            </div>
            <div className={classes.title}>{providerName}</div>
            <div className={classes.deal}>{dealName}</div>
            <div className={classes['continue-button']}><Button variant="contained">Continue</Button></div>
        </div>
        
        
    )
}
 
export default DealHeader;