import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { Kanban } from "pages/Kanban";
import { Epic } from "pages/Epic";

export const Project = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        {/* projects/:projectId/kanban */}
        <Route path={"/kanban"} element={<Kanban />} />
        {/* projects/:projectId/epic */}
        <Route path={"/epic"} element={<Epic />} />
        <Navigate to={window.location.pathname + "/kanban"} />
      </Routes>
    </div>
  );
};