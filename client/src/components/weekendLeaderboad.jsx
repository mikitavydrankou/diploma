import styles from "./WeekendLeaderboard.module.css";

const WeekendLeaderboard = () => {
  const leaders = [
    {
      id: 1,
      nickname: "John Doe",
      trades: 10,
    },
    {
      id: 3,
      nickname: "Beslan",
      trades: 3,
    },
    {
      id: 4,
      nickname: "Marta",
      trades: 2,
    },
  ];
  return (
    <div className={styles.leaderboard}>
      <h3 className={styles.leaderboardTitle}>Lidery tygodnia</h3>
      <div>
        {leaders.map((leader) => (
          <p className={styles.leaderboardItem} key={leader.id} leader={leader}>
            {leader.nickname} - {leader.trades}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WeekendLeaderboard;
