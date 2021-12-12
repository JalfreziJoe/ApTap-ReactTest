import classes from './CompareItem.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const CompareItem = ({id, providerImage, providerName, dealName, removeItem }) => {
    return (
        <div className={classes.container}>
            <div className={classes.image}>
                <img src={providerImage} alt={providerName} />
            </div>
            <div className={classes.title}>{providerName}</div>
            <div className={classes.deal}>{dealName}</div>
            <div className={classes.close}><IconButton aria-label="close" onClick={() => removeItem(id)}><CloseIcon /></IconButton></div>
        </div>
    );
};

export default CompareItem;
