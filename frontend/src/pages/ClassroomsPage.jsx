import BreadcrumbNav from "../components/BreadcrumbNav";
import ListClassroomCards from "../features/classrooms/ListClassroomCards";

const ClassroomsPage = () => {
  return (
    <div className="h-[100%] w-[100%] overflow-y-auto overflow-x-hidden bg-gray-100">
      <BreadcrumbNav currentPage="Classrooms" />
      <div className="py-8 px-4">
        <ListClassroomCards />
      </div>
    </div>
  );
};

export default ClassroomsPage;

