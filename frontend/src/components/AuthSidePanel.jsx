import ELearningImage from "../assets/images/ELearningImage.png";

const AuthSidePanel = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center p-8 bg-blue-600 text-white">
      <img
        src={ELearningImage}
        alt="auth side panel image"
        className="w-3/4 mb-8"
      />
      <h3 className="text-2xl font-semibold mb-4">
        Empower Your Learning Journey
      </h3>
      <p className="text-lg">
        Discover a seamless and engaging educational experience. Access your
        classrooms, collaborate with peers, and manage your learning all in one
        place. Take your education to the next level with personalized tools and
        insights.
      </p>
    </div>
  );
};

export default AuthSidePanel;
