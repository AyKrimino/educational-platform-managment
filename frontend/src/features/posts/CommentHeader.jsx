import { Box, Typography } from "@mui/material";

const CommentHeader = ({ comment }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="subtitle1" fontWeight="bold">
        {`${comment.user.first_name} ${comment.user.last_name}`}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {new Date(comment.created_at).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography>
    </Box>
  );
};

export default CommentHeader;
