import axiosInstance from "./axiosInstance";

/**
 * Fetches the list of posts for a specific classroom.
 *
 * @async
 * @function getPostsListByClassroomId
 * @param {string} classroomId - The UUID of the classroom whose posts are to be fetched.
 * @returns {Promise<Object>} - A promise that resolves to the server's response containing the list of posts.
 * @throws {Error} - Throws an error if the request fails, with details about the issue.
 *
 * @example
 * const posts = await getPostsListByClassroomId("cf47e074-e9f3-4fcf-9ec2-c2a701150bda");
 * console.log(posts.data);
 */
export const getPostsListByClassroomId = async (classroomId) => {
  try {
    const response = await axiosInstance.get(
      `/classrooms/${classroomId}/posts/`,
    );
    return response;
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
};

/**
 * Creates a new post in a specific classroom.
 *
 * @async
 * @function createPost
 * @param {string} classroomId - The UUID of the classroom where the post is to be created.
 * @param {Object} classroomData - The data for the new post.
 * @param {string} classroomData.title - The title of the post.
 * @param {string} classroomData.content - The content of the post.
 * @returns {Promise<Object>} - A promise that resolves to the server's response confirming the post creation.
 * @throws {Error} - Throws an error if the request fails, with details about the issue.
 *
 * @example
 * const newPost = {
 *   title: "Classroom Updates",
 *   content: "Don't forget to submit your assignments by Friday."
 * };
 * const response = await createPost("cf47e074-e9f3-4fcf-9ec2-c2a701150bda", newPost);
 * console.log(response.data);
 */
export const createPost = async (classroomId, postData) => {
  try {
    const response = await axiosInstance.post(
      `/classrooms/${classroomId}/posts/create/`,
      postData,
    );
    return response;
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
};

/**
 * Fetches the list of comments for a specific post in a classroom.
 *
 * @async
 * @function getCommentsListByClassroomIdAndPostId
 * @param {string} classroomId - The UUID of the classroom containing the post.
 * @param {string} postId - The UUID of the post whose comments are to be fetched.
 * @returns {Promise<Object>} - A promise that resolves to the server's response containing the list of comments.
 * @throws {Error} - Throws an error if the request fails, with details about the issue.
 *
 * @example
 * const comments = await getCommentsListByClassroomIdAndPostId(
 *   "cf47e074-e9f3-4fcf-9ec2-c2a701150bda",
 *   "ab23cd45-ef67-gh89-ij01-klmnopqr2345"
 * );
 * console.log(comments.data);
 */
export const getCommentsListByClassroomIdAndPostId = async (
  classroomId,
  postId,
) => {
  try {
    const response = await axiosInstance.get(
      `/classrooms/${classroomId}/posts/${postId}/comments/`,
    );
    return response;
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
};

/**
 * Creates a new comment for a specific post in a classroom.
 *
 * @async
 * @function createComment
 * @param {string} classroomId - The UUID of the classroom containing the post.
 * @param {string} postId - The UUID of the post where the comment is to be created.
 * @param {Object} commentData - The data for the new comment.
 * @param {string} commentData.content - The content of the comment.
 * @returns {Promise<Object>} - A promise that resolves to the server's response confirming the comment creation.
 * @throws {Error} - Throws an error if the request fails, with details about the issue.
 *
 * @example
 * const newComment = {
 *   content: "This is a great post! Thank you for sharing."
 * };
 * const response = await createComment(
 *   "cf47e074-e9f3-4fcf-9ec2-c2a701150bda",
 *   "ab23cd45-ef67-gh89-ij01-klmnopqr2345",
 *   newComment
 * );
 * console.log(response.data);
 */
export const createComment = async (classroomId, postId, commentData) => {
  try {
    const response = await axiosInstance.post(
      `/classrooms/${classroomId}/posts/${postId}/comments/create/`,
      commentData,
    );
    return response;
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
};
