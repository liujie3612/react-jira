import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { Button, Dropdown, Menu } from "antd";
// emotion变量功能
import styled from "@emotion/styled";
import { Row, ButtonNoPadding } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/ProjectList";
import { Project } from "pages/Project";
import { ReactComponent as SoftWareLogo } from "assets/software-logo.svg";
import { resetRoute } from "utils";
import { ProjectModal } from "pages/ProjectList/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  // 状态提升
  // prop drilling
  // 调用和使用太远了
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectList setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route path={"/projects/:projectId/*"} element={<Project />} />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        onClose={() => setProjectModalOpen(false)}
        projectModalOpen={projectModalOpen}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftWareLogo width={"10rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>Hi, {user?.name}</Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
