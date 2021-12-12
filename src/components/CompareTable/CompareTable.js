import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MonthlyCost from '../ui/MonthlyCost/MonthlyCost';
import ProviderTitle from '../ui/ProviderTitle/ProviderTitle';
import Speed from '../ui/Speed/Speed';
import Contract from '../ui/Contract/Contract';

import CompareDrawer from '../CompareDrawer/CompareDrawer';

import useHttp from '../../hooks/use-http';
import { useEffect, useState } from 'react';
import CompareDialog from '../CompareDialog/CompareDialog';

const CompareTable = () => {
    const [providerData, setProviderData] = useState([]);
    const [compareItems, setCompareItems] = useState([]);
    const [isLoading, error, requestData] = useHttp();
    const [openCompare, setOpenCompare] = useState(false);

    useEffect(() => {
        const transformData = data => {
            
            setProviderData(data.deals);
        };
        requestData(
            {
                url: 'https://6177b8b59c328300175f5adc.mockapi.io/api/test/deals',
            },
            transformData
        );
    }, [requestData]);


    const checkAddedToCompare = (dealId) => {
        let foundDeal = false;
        const foundItem = compareItems.find(item => (item === dealId) );
        
        if (!!foundItem) {
            foundDeal = true;
        }
        return foundDeal;
    }

    const addToCompareHandler = (deal_id) => {
        const newCompareItems = [...compareItems];
        newCompareItems.push(deal_id);
        setCompareItems(newCompareItems);
        console.log('added to compare');
        console.log(deal_id);
        console.log(newCompareItems);
        console.log(compareItems);
    }

    const removeFromCompareHandler = (deal_id) => {
        let newCompareItems;
        newCompareItems = compareItems.filter(item => item !== deal_id);
        setCompareItems(newCompareItems);
    }

    const openCompareHandler = () => {
        setOpenCompare(true);
    }

    const closeCompareHandler = () => {
        setOpenCompare(false);
    }

    const getCompareDealsHandler = () => {
        const dealsToCompare = providerData.filter(deal => compareItems.includes( deal.deal_id) );
        return dealsToCompare;
        
    }

    let tableData = 'loading...';
    if (providerData.length !== 0 && !isLoading && !error) {
        tableData = (
          <>
            <TableContainer
                component={Paper}
                sx={{ maxWidth: '90%', marginTop: '1em', marginBottom: '1em' }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {providerData.map(data => (
                            <TableRow
                                key={data.deal_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell size="small" scope="row" align="center">
                                    <img
                                        src={data.provider_logo_image_url}
                                        alt={data.provider_name}
                                        style={{ maxHeight: '5em' }}
                                    />
                                </TableCell>
                                <TableCell align="left" size="medium">
                                    <ProviderTitle
                                        title={data.provider_name}
                                        deal={data.deal_name}
                                        rating={data.provider_rating}
                                    />
                                </TableCell>
                                <TableCell align="left" size="small">
                                    <MonthlyCost cost={data.monthly_price} />
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <Speed
                                        bbSpeed={data.internet_speed}
                                        bbType={data.broadband_type}
                                    />
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <Contract contractLength={data.contract_info} />
                                </TableCell>
                                <TableCell align="center">
                                    {checkAddedToCompare(data.deal_id)? (
                                        <Button variant="outlined" onClick={() => removeFromCompareHandler(data.deal_id)}>Remove</Button>
                                        ): (
                                        <Button variant="outlined" onClick={() => addToCompareHandler(data.deal_id)}>Add to Compare</Button>
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained">Continue</Button>
                                </TableCell>
                                <TableCell align="right">
                                    More info <KeyboardArrowDownIcon />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {compareItems.length > 0 && <CompareDrawer deals={getCompareDealsHandler()} removeItem={removeFromCompareHandler} openCompareDialog={openCompareHandler} />}
            <CompareDialog setOpen={openCompare} closeHandler={closeCompareHandler} deals={getCompareDealsHandler()} removeDeal={removeFromCompareHandler}/>
            </>
        );
    }

    return tableData;
};

export default CompareTable;
