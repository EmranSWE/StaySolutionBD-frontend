import { UserOutlined } from "@ant-design/icons";
import styles from "./css/propertyCard.module.css";
import { Avatar, Rate } from "antd";
import { truncateText } from "@/utils/truncateText";
const FeedbackCard = ({ feedbackData }: any) => {
  const { name, feedback, rating, user } = feedbackData;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.avatarBackground}>
        <div className={styles.avatarSection}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            src={user.profilePic}
            alt={name}
          />
        </div>
      </div>
      <div className={styles.contentSection}>
        <h3
          className={styles.userName}
        >{`${user?.firstName}  ${user?.lastName}`}</h3>
        <Rate disabled value={rating} />
        <p className={styles.feedbackText}>
          {truncateText({ text: feedback, limit: 130 })}
        </p>
      </div>
    </div>
  );
};

export default FeedbackCard;
