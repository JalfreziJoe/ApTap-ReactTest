const MonthlyCost = ({cost}) => {
    return (
        <div>
            <h1>£{cost.toFixed(2)}</h1>
            <div>Monthly Cost</div>
        </div>
    )
}
export default MonthlyCost;