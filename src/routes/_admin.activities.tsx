import { createFileRoute } from '@tanstack/react-router';
import { useAdminActivities, useCreateActivity } from '@/hooks/use-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { activitiesService } from '@/lib/api-services';
import { useQueryClient } from '@tanstack/react-query';

export const Route = createFileRoute('/_admin/activities')({
  component: AdminActivities,
});

function AdminActivities() {
  const { data: activities, isLoading } = useAdminActivities();
  const createActivity = useCreateActivity();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'COMMUNITY' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createActivity.mutate(formData, {
      onSuccess: () => {
        toast.success('تمت إضافة النشاط بنجاح');
        setIsOpen(false);
        setFormData({ title: '', description: '', category: 'COMMUNITY' });
      },
      onError: () => toast.error('فشل في إضافة النشاط'),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا النشاط؟')) return;
    try {
      await activitiesService.delete(id);
      toast.success('تم الحذف بنجاح');
      queryClient.invalidateQueries({ queryKey: ['admin-activities'] });
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">إدارة الأنشطة</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              <Plus className="w-4 h-4" /> إضافة نشط جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة نشط جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان النشاط</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={createActivity.isPending}>
                {createActivity.isPending ? 'جاري الحفظ...' : 'حفظ'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-slate-100 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-right font-semibold text-slate-700">العنوان</TableHead>
                <TableHead className="text-right font-semibold text-slate-700">تاريخ الإضافة</TableHead>
                <TableHead className="text-right font-semibold text-slate-700">التصنيف</TableHead>
                <TableHead className="text-left font-semibold text-slate-700">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">جاري التحميل...</TableCell>
                </TableRow>
              ) : activities?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">لا توجد أنشطة مضافة</TableCell>
                </TableRow>
              ) : (
                activities?.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium text-slate-800">{activity.title}</TableCell>
                    <TableCell className="text-slate-600">{new Date(activity.createdAt).toLocaleDateString('ar-DZ')}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{activity.category}</span>
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-600" onClick={() => handleDelete(activity.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
