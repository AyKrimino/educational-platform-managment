import ClassroomCard from "./ClassroomCard";
import { Typography } from "@mui/material";

const ListClassroomCards = () => {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      <div className="mb-8">
        <Typography variant="h5">Your Classrooms</Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
        <ClassroomCard />
      </div>
    </div>
  );
};

export default ListClassroomCards;
