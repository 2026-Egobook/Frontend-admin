import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "@/app/routes/path";
import LoginPage from "@/features/auth/pages/LoginPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}