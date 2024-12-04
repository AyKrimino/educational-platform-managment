import { useState } from "react";
import ClassroomContext from "../context/ClassroomContext";

const ClassroomProvider = ({ children }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handleJoinModalOpen = () => setJoinModalOpen(true);
  const handleJoinModalClose = () => setJoinModalOpen(false);
  
  return (
    <ClassroomContext.Provider
      value={{
        createModalOpen,
        joinModalOpen,
        handleCreateModalOpen,
        handleCreateModalClose,
        handleJoinModalOpen,
        handleJoinModalClose,
      }}
    >
      {children}
    </ClassroomContext.Provider>
  );
};
export default ClassroomProvider;
