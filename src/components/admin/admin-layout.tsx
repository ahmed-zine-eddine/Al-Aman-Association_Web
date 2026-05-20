import { Outlet, useNavigate } from '@tanstack/react-router';
import { useAdminProfile } from '@/hooks/use-api';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Target, Users, Image as ImageIcon, Settings, LogOut } from 'lucide-react';
import { authService } from '@/lib/api-services';

export function AdminLayout() {
  const navigate = useNavigate();
  const { data: profile, isLoading, isError } = useAdminProfile();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading admin...</div>;
  }

  if (isError || !profile) {
    navigate({ to: '/admin/login', replace: true });
    return null;
  }

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem('accessToken');
      navigate({ to: '/admin/login' });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-slate-50 w-full" dir="rtl">
        <Sidebar className="border-l border-slate-200 bg-white">
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800">جمعية الأمان</h2>
            <p className="text-sm text-slate-500">لوحة التحكم</p>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate({ to: '/admin/dashboard' })}>
                    <LayoutDashboard className="ml-2 w-5 h-5" /> الرئيسية
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate({ to: '/admin/programs' })}>
                    <Target className="ml-2 w-5 h-5" /> البرامج
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate({ to: '/admin/activities' })}>
                    <Users className="ml-2 w-5 h-5" /> الأنشطة
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate({ to: '/admin/gallery' })}>
                    <ImageIcon className="ml-2 w-5 h-5" /> المعرض
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="ml-2 w-5 h-5" /> الإعدادات
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} className="text-red-600 hover:text-red-700">
                    <LogOut className="ml-2 w-5 h-5" /> تسجيل الخروج
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8 overflow-y-auto w-full max-w-[100vw]">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-slate-800">مرحباً، {profile.name}</h1>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
