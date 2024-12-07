import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Divider
} from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { getPostsListByClassroomId, createPost } from "../../services/postsServices";

const PostsTab = ({ classroomId }) => {
  const { auth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPostsListByClassroomId(classroomId);
        console.log(response);
        setPosts(response.data);
      } catch (error) {
        console.log("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [classroomId, refresh]);

  const handleCreatePost = async () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const postData = {
        title: newPostTitle,
        content: newPostContent,
      };
      console.log(postData);
      try {
        await createPost(classroomId, postData);
        setRefresh((prev) => !prev);
      } catch (error) {
        console.log("Error creating a new post:", error);
      }
      setNewPostTitle("");
      setNewPostContent("");
    }
  }
    return (
      <Box
        sx={{
          px: 3,
          py: 4,
          maxWidth: "800px", 
          margin: "0 auto", 
        }}
      >
        {/* Section for creating a new post */}
        {auth.role === "teacher" && (
          <Box
            mb={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2, 
            }}
          >
            <TextField
              label="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="New Post"
              multiline
              rows={4}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePost}
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
              Create Post
            </Button>
          </Box>
        )}

        {/* Posts Section */}
        <Box>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  mb: 3,
                  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h4">{post.title}</Typography>
                  <Typography variant="h6" gutterBottom>
                    {post.content}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <CommentsSection postId={post.id} />
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary">
              No posts yet.
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  const CommentsSection = ({ postId }) => {
    const { auth } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
      const fetchComments = () => {
        console.log("implement getComments(postId)");
      };

      fetchComments();
    }, [postId]);

    const handleAddComment = () => {
      if (newComment.trim()) {
        setNewComment("");
        console.log("implement addComment()");
      }
    };

    return (
      <Box
        sx={{
          px: 3,
          py: 4,
          maxWidth: "800px", 
          margin: "0 auto", 
        }}
      >
        {/* Comments Section */}
        <Typography variant="h6" gutterBottom>
          Comments:
        </Typography>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                mb: 2,
                p: 2,
                borderLeft: "3px solid #1976d2",
                boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">{comment.content}</Typography>
              <Typography variant="body2" color="textSecondary">
                - By {comment.author}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments yet.
          </Typography>
        )}

        {/* Add Comment Section */}
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

  export default PostsTab;
