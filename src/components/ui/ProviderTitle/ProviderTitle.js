import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import './ProviderTitle.module.css';

const ProviderTitle = ({title, deal, rating}) => {
    const rating5Star = rating * 5;
    return (
        <div>
            <h1>{title}</h1>
            <div>{deal}</div>
            <div>
            <Stack spacing={1}>
                <Rating name="rating" value={rating5Star} precision={0.1} size="small" readOnly />
            </Stack>
            </div>
        </div>
    );
}

export default ProviderTitle;