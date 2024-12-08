import { useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import {
  createComment,
  deleteComment,
  getComment,
  getCommentsListByClassroomIdAndPostId,
  updateComment,
} from "../../services/postsServices";
import CommentHeader from "./CommentHeader";

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;

const CommentsSection = ({ classroomId, postId }) => {
  const { auth } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [showAllComments, setShowAllComments] = useState(false); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsListByClassroomIdAndPostId(
          classroomId,
          postId,
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, classroomId, refresh]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const commentData = { content: newComment };
      try {
        await createComment(classroomId, postId, commentData);
        setRefresh((prev) => !prev);
        setNewComment("");
      } catch (error) {
        console.error("Error creating comment:", error);
      }
    }
  };

  const handleEditComment = async (commentId, content) => {
    try {
      await updateComment(classroomId, postId, commentId, {content}); 
    } catch (error) {
      console.error("Error updating comment:", error);
    }
    setEditingCommentId(null);
    setRefresh((prev) => !prev);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(classroomId, postId, commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
    setRefresh((prev) => !prev);
  };

  const handleEditClick = async (commentId) => {
    try {
      const response = await getComment(classroomId, postId, commentId);
      setEditingCommentId(commentId);
      setEditedContent(response.data.content);
    } catch (error) {
      console.error("Error fetching comment:", error);
    }
  };

  const hasPermissionToPeformAction = (commentAuthorUserId, action) => {
    const payload = JSON.parse(atob(auth.access.split(".")[1]));
    const authenticatedUserId = payload.user_id;
    if (action === "DELETE") {
      if (auth.role === "teacher") return true;
      return authenticatedUserId === commentAuthorUserId;
    } else if (action === "EDIT") {
      return authenticatedUserId === commentAuthorUserId;
    }
    console.error("Unexpected error occurred!");
    return false;
  };

  const commentsToShow = showAllComments ? comments : comments.slice(0, 3);

  return (
    <Box
      sx={{
        px: 3,
        py: 4,
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Comments:
      </Typography>

      {commentsToShow.length > 0 ? (
        commentsToShow.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              padding: 2,
              borderRadius: 2,
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <Avatar
              alt="User Profile"
              src={`${BASE_URL}${comment.user.profile_picture}`}
              sx={{ width: 48, height: 48 }}
            />

            <Box sx={{ flex: 1 }}>
              <CommentHeader comment={comment} />

              {editingCommentId === comment.id ? (
                <TextField
                  multiline
                  fullWidth
                  rows={2}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  sx={{ mt: 1 }}
                />
              ) : (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {comment.content}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  gap: 1,
                }}
              >
                {editingCommentId === comment.id ? (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleEditComment(comment.id, editedContent)
                      }
                      sx={{ textTransform: "none" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditingCommentId(null)}
                      sx={{ textTransform: "none" }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    {hasPermissionToPeformAction(comment.user.id, "EDIT") && (
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleEditClick(comment.id)}
                        sx={{ textTransform: "none" }}
                      >
                        Edit
                      </Button>
                    )}
                    {hasPermissionToPeformAction(comment.user.id, "DELETE") && (
                      <Button
                        variant="text"
                        color="error"
                        onClick={() => handleDeleteComment(comment.id)}
                        sx={{ textTransform: "none" }}
                      >
                        Delete
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No comments yet.
        </Typography>
      )}

      {comments.length > 3 && (
        <Button
          variant="text"
          onClick={() => setShowAllComments((prev) => !prev)}
          sx={{ textTransform: "none", fontWeight: "bold", mt: 2 }}
        >
          {showAllComments ? "Show Less" : "Show More"}
        </Button>
      )}

      {auth.role && (
        <Box mt={3} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Add a Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            variant="outlined"
            multiline
            rows={3}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
              ":hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              },
            }}
          >
            Comment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommentsSection;
