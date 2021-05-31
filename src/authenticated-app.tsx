import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/ProjectList";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectList />
    </div>
  );
};
