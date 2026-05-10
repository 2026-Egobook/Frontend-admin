import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import LoginPage from '../../features/auth/pages/LoginPage';
import MemberListPage from '../../features/member/pages/MemberListPage';
import MemberDetailPage from '../../features/member/pages/MemberDetailPage';
import ContentManagementPage from '../../features/content/pages/ContentManagementPage';
import ReportListPage from '../../features/report/pages/ReportListPage';
import ReportDetailPage from '../../features/report/pages/ReportDetailPage';
import CrudManagementPage from '@/features/crud/pages/CrudManagementPage';
import StatisticsPage from '@/features/statistics/pages/StatisticsPage';
import { PATH } from './path';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.LOGIN} element={<LoginPage />} />

        <Route element={<AdminLayout />}>
          <Route path={PATH.MEMBER_LIST} element={<MemberListPage />} />
          <Route path={PATH.MEMBER_DETAIL} element={<MemberDetailPage />} />
          <Route path={PATH.CONTENT} element={<ContentManagementPage />} />
          <Route path={PATH.REPORT_LIST} element={<ReportListPage />} />
          <Route path={PATH.REPORT_DETAIL} element={<ReportDetailPage />} />
          <Route path={PATH.CRUD} element={<CrudManagementPage />} />
          <Route path={PATH.STATS} element={<StatisticsPage />} />
        </Route>

        <Route path="*" element={<Navigate to={PATH.MEMBER_LIST} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
