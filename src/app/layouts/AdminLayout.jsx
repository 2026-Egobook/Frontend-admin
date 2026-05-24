import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FiUsers, FiFileText, FiAlertCircle, FiDatabase, FiBarChart2 } from 'react-icons/fi';
import { PATH } from '../routes/path';

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { label: '회원 관리', path: PATH.MEMBER_LIST, icon: FiUsers },
    { label: '콘텐츠 관리', path: PATH.CONTENT, icon: FiFileText },
    { label: '신고 관리', path: PATH.REPORT_LIST, icon: FiAlertCircle },
    { label: 'CRUD 관리', path: PATH.CRUD, icon: FiDatabase },
    { label: '통계', path: PATH.STATS, icon: FiBarChart2 },
  ];

  const isActiveMenu = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-white">
      <header className="flex h-16 items-center border-b border-neutral-200 bg-white px-8">
        <h1 className="text-[20px] font-semibold leading-7 text-neutral-950">관리자 대시보드</h1>
      </header>

      <div className="flex min-h-[calc(100vh-64px)] bg-white">
        <aside className="w-64 shrink-0 border-r border-neutral-200 bg-white px-4 pt-4">
          <nav className="flex flex-col gap-1">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const active = isActiveMenu(menu.path);

              return (
                <button
                  key={menu.path}
                  type="button"
                  onClick={() => navigate(menu.path)}
                  className={`flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm transition-colors ${
                    active ? 'bg-black text-white' : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="font-normal leading-5">{menu.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 bg-white px-8 pt-8 pb-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
