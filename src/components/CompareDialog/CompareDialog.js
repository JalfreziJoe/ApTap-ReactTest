import {
    Dialog,
    Table,
    TableBody,
    TableRow,
    TableCell,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,

} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import DealHeader from './DealHeader';

const CompareDialog = ({ setOpen, closeHandler, deals, removeDeal }) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {

        const rowTitles = {
            deal_id:'  ',
            provider_rating:'Rating',
            monthly_price: 'Monthly Cost',
            calls_info: 'Tariff Type',
            internet_speed: 'Speed',
            broadband_type:'Broadband Type',
            set_up_cost:'Set Up cost',
            contract_info:'Term end',
            data_limits:'Data limits',
    };

        
        const getDataRow = (key) => {
            let dataRow = [];
            dataRow.push(rowTitles[key]);
            for (let a = 0; a<deals.length;a++) {
                if (key === 'deal_id') {
                    dataRow.push(<DealHeader removeDeal={removeDeal} dealId={deals[a][key]} providerImage={deals[a]['provider_logo_image_url']} providerName={deals[a]['provider_name']} dealName={deals[a]['deal_name']} />);
                } else {
                    dataRow.push(deals[a][key]);
                }
            }
            return dataRow;
        }

        const transformData = () => {
            let rows = [];
            Object.keys(rowTitles).forEach(key => {
                rows.push(getDataRow(key));
            });
            setData(rows);
        }

        transformData();
        console.log(data);

    }, [deals]);

    
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    return (

        <Dialog fullWidth={true} maxWidth="xl" open={setOpen} onClose={closeHandler}>
            <DialogTitle sx={{ alignSelf: 'flex-start' }}>
                Compare
                <IconButton onClick={closeHandler} sx={{position:"absolute", top:"9px", right:"9px"}}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Table>
                        <TableBody>
                                {data.map(row => (
                                    <StyledTableRow key={row + Math.random()}>
                                        { row.map((cell, index) => (
                                            <TableCell align={(index=== 0)?'left':'center'} sx={(index===0) ?{maxWidth:"30%"}:{maxWidth:"150px"}} key={cell +Math.random()}>{cell}</TableCell> 

                                        ))}
                                    </StyledTableRow>
                                    
                                ))}
                            
                        </TableBody>
                    </Table>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default CompareDialog;
