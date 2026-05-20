import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, ImageIcon, MessageSquare } from 'lucide-react';
import { useAdminPrograms, useAdminActivities, useAdminGallery } from '@/hooks/use-api';

export const Route = createFileRoute('/_admin/dashboard')({
  component: DashboardIndex,
});

function DashboardIndex() {
  const { data: programs } = useAdminPrograms();
  const { data: activities } = useAdminActivities();
  const { data: gallery } = useAdminGallery();

  const stats = [
    { label: 'إجمالي البرامج', value: programs?.length || 0, icon: Target, color: 'text-blue-500' },
    { label: 'الأنشطة', value: activities?.length || 0, icon: Users, color: 'text-green-500' },
    { label: 'ألبومات الصور', value: gallery?.length || 0, icon: ImageIcon, color: 'text-purple-500' },
    { label: 'رسائل التواصل', value: 0, icon: MessageSquare, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.label}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">آخر الأنشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities?.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">{activity.title}</span>
                  <span className="text-sm text-slate-500">{new Date(activity.createdAt).toLocaleDateString('ar-DZ')}</span>
                </div>
              ))}
              {(!activities || activities.length === 0) && (
                <p className="text-slate-500 text-center py-4">لا توجد أنشطة حالياً</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
