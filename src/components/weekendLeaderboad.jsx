const WeekendLeaderboard = () => {
    const leaders = ([
        {
            id: 1,
            nickname: 'John Doe',
            trades: 10,
        } ,
        {
            id: 3,
            nickname: 'Beslan',
            trades: 3,
        } ,
        {
            id: 4,
            nickname: 'Marta',
            trades: 2,
        } 
    ]);
    return (
        
        <div className="weekend-leaderboard">
            <h3>Lidery tygodnia</h3>
            <div>
                {leaders.map(leader => (
                <p key={leader.id} leader={leader}> 
                    {leader.nickname} - {leader.trades}
                </p>
                ))}
            </div>

        </div>
    );
}

export default WeekendLeaderboard;