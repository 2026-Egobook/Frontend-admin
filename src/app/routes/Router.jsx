import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '../../features/auth/pages/LoginPage';
import MemberListPage from '../../features/member/pages/MemberListPage';
import MemberDetailPage from '../../features/member/pages/MemberDetailPage';
import { PATH } from './path';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.LOGIN} element={<LoginPage />} />

        <Route element={<AdminLayout />}>
          <Route path={PATH.MEMBER_LIST} element={<MemberListPage />} />
          <Route path={PATH.MEMBER_DETAIL} element={<MemberDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to={PATH.MEMBER_LIST} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
