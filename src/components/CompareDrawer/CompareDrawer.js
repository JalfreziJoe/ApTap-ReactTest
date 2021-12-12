import classes from './CompareDrawer.module.css';
import CompareItem from './CompareItem';

import { Button } from '@mui/material';

const CompareDrawer = ({deals, removeItem, openCompareDialog}) => {
    return (
        <div className={classes['compare-drawer']}>
            <div className={classes.container}>
            {(deals.length > 0) && deals.map(item => (
                <CompareItem key={item.deal_id} id={item.deal_id} providerImage={item.provider_logo_image_url} providerName={item.provider_name} dealName={item.deal_name} removeItem={removeItem} />
            ))}
            <Button onClick={openCompareDialog} sx={{margin:".9em", borderRadius:"20px"}} size="small" variant='contained'>Compare deals ({deals.length.toString()} of {deals.length.toString()})</Button>
            </div>
        </div>
    )
}

export default CompareDrawer;