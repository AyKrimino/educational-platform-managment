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
export const createPost = async (classroomId, classroomData) => {
  try {
    const response = await axiosInstance.post(
      `/classrooms/${classroomId}/posts/create/`,
      classroomData,
    );
    return response;
  } catch (error) {
    throw new Error(`An unexpected error occurred: ${error.message}`);
  }
};
