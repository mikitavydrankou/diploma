import styles from "./WeekendLeaderboard.module.css";
import { useEffect, useState } from "react";

const WeekendLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/leaderboard");
        const data = await response.json();

        if (data.success) {
          setLeaders(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.leaderboard}>
      <h3 className={styles.leaderboardTitle}>Lidery tygodnia</h3>
      <div>
        {leaders.map((leader) => (
          <div className={styles.leaderboardItem} key={leader.userId}>
            <span>
              {leader.user.username} - {leader.offerCount} ofert
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekendLeaderboard;
