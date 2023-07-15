import { Container } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ProtectedElement from "./components/ProtectedElement";
import ProtectedRoute from "./components/ProtectedRoute";
import SessionValidator from "./components/SessionValidator";
import { AuthState } from "./features/auth/authSlice";
import { useAppSelector } from "./hooks";
import PageAddPeople from "./pages/PageAddPeople";
import PageAgendatedPeople from "./pages/PageAgendatedPeople";
import PageAuth from "./pages/PageAuth";
import PageCalendar from "./pages/PageCalendar";
import PageCancelledPeople from "./pages/PageCancelledPeople";
import PageChangePassword from "./pages/PageChangePassword";
import PageEditPeople from "./pages/PageEditPeople";
import PageFaqs from "./pages/PageFaqs";
import PageHome from "./pages/PageHome";
import PageLinkRecoveryPsw from "./pages/PageLinkRecoveryPsw";
import PageManageUsers from "./pages/PageManageUsers";
import PageNotFound from "./pages/PageNotFound";
import PageProgramming from "./pages/PageProgramming";
import PageRecoveryPassword from "./pages/PageRecoveryPassword";
import PageRegisterUsers from "./pages/PageRegisterUsers";
import PageReportsPeople from "./pages/PageReportsPeople";
import PageStcsDaily from "./pages/PageStcsDaily";
import PageStcsScheduled from "./pages/PageStcsScheduled";

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
    const authState: AuthState = useAppSelector(({ auth }) => auth);

    const avatar = authState.auth
        ? `/img/${authState.user.role}/avatar.png`
        : "";
    const permissions = authState.user.permissions;

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SessionValidator />
                <Container fluid>
                    <ProtectedElement isAllowed={authState.auth}>
                        <NavBar avatar={avatar} permissions={permissions} />
                    </ProtectedElement>
                    <Routes>
                        <Route
                            index
                            element={
                                <ProtectedRoute
                                    isAllowed={!authState.auth}
                                    navigateTo="/home/welcome"
                                >
                                    <PageAuth />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auth/login"
                            element={
                                <ProtectedRoute
                                    isAllowed={!authState.auth}
                                    navigateTo="/home/welcome"
                                >
                                    <PageAuth />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            element={
                                <ProtectedRoute isAllowed={authState.auth} />
                            }
                        >
                            <Route
                                path="/home/welcome"
                                element={<PageHome permissions={permissions} />}
                            />
                            <Route
                                path="/users/manage/password/:role/change"
                                element={<PageChangePassword />}
                            />
                            <Route
                                path="/people/view"
                                element={<PageAgendatedPeople />}
                            />
                            <Route
                                path="/people/cancelled"
                                element={<PageCancelledPeople />}
                            />
                            <Route
                                path="/people/view/:id/edit"
                                element={<PageEditPeople />}
                            />
                            <Route
                                path="/help/asks/frecuently"
                                element={<PageFaqs />}
                            />
                        </Route>

                        <Route
                            element={
                                <ProtectedRoute
                                    isAllowed={
                                        authState.auth &&
                                        permissions.includes("admin")
                                    }
                                    navigateTo="/home/welcome"
                                />
                            }
                        >
                            <Route
                                path="/users/manage"
                                element={<PageManageUsers />}
                            />
                            <Route
                                path="/users/manage/add"
                                element={<PageRegisterUsers />}
                            />
                            <Route
                                path="/users/manage/:role/delete"
                                element={<PageManageUsers />}
                            />
                        </Route>

                        <Route
                            path="/people/add"
                            element={
                                <ProtectedRoute
                                    isAllowed={
                                        authState.auth &&
                                        permissions.includes("add")
                                    }
                                    navigateTo="/home/welcome"
                                >
                                    <PageAddPeople />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/people/schedule"
                            element={
                                <ProtectedRoute
                                    isAllowed={
                                        authState.auth &&
                                        permissions.includes("schedule")
                                    }
                                    navigateTo="/home/welcome"
                                >
                                    <PageProgramming />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/people/preview"
                            element={
                                <ProtectedRoute
                                    isAllowed={authState.auth}
                                    navigateTo="/home/welcome"
                                >
                                    <PageCalendar />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/people/reports"
                            element={
                                <ProtectedRoute
                                    isAllowed={
                                        authState.auth &&
                                        permissions.includes("reports")
                                    }
                                    navigateTo="/home/welcome"
                                >
                                    <PageReportsPeople />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/people/statistics/daily"
                            element={
                                <ProtectedRoute
                                    isAllowed={
                                        authState.auth &&
                                        permissions.includes("statistics")
                                    }
                                    navigateTo="/home/welcome"
                                >
                                    <PageStcsDaily />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/people/statistics/scheduled"
                            element={
                                <ProtectedRoute
                                    isAllowed={
                                        authState.auth &&
                                        permissions.includes("statistics")
                                    }
                                    navigateTo="/home/welcome"
                                >
                                    <PageStcsScheduled />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/forget/my/password"
                            element={<PageRecoveryPassword />}
                        />

                        <Route
                            path="/forget/my/password/:email/:resetToken"
                            element={<PageLinkRecoveryPsw />}
                        />

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Container>

                <Footer />
            </BrowserRouter>
        </QueryClientProvider>
    );
}
