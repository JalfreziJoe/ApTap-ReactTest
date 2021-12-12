const Speed = ({bbSpeed, bbType}) => {
    return (
        <div>
            <h1>{bbSpeed} Mbps</h1>
            <div>{bbType}</div>
        </div>
    );
}

export default Speed;