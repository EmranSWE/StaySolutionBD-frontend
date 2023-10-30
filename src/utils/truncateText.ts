type ITruncateProps = {
  text: string;
  limit: number;
};
export const truncateText = ({ text, limit }: ITruncateProps) => {
  if (text?.length > limit) {
    return text?.substring(0, limit) + "...";
  } else {
    return text;
  }
};
