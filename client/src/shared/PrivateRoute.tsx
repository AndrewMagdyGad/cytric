import { selectCurrentUser } from "../features/auth/redux/auth.slice";
import { useAppSelector } from "../redux/store";
import { Navigate } from "react-router-dom";

interface Props {
    component: React.ComponentType;
    isUserLoading?: boolean;
    adminOnly?: boolean;
}

export const PrivateRoute: React.FC<Props> = ({
    component: RouteComponent,
    isUserLoading,
}) => {
    const user = useAppSelector(selectCurrentUser);

    if (user) {
        return <RouteComponent />;
    }

    if (isUserLoading) {
        return <></>;
    }

    return <Navigate to={"/login"} />;
};
