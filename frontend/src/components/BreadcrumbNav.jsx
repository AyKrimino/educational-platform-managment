import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const BreadcrumbNav = ({ currentPage }) => {
  return (
    <div className="py-4 px-8">
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="textPrimary">{currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbNav;
