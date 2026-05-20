import { createFileRoute } from '@tanstack/react-router';
import { useAdminPrograms, useCreateProgram } from '@/hooks/use-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { programsService } from '@/lib/api-services';
import { useQueryClient } from '@tanstack/react-query';

export const Route = createFileRoute('/_admin/programs')({
  component: AdminPrograms,
});

function AdminPrograms() {
  const { data: programs, isLoading } = useAdminPrograms();
  const createProgram = useCreateProgram();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProgram.mutate(formData, {
      onSuccess: () => {
        toast.success('تمت إضافة البرنامج بنجاح');
        setIsOpen(false);
        setFormData({ title: '', description: '' });
      },
      onError: () => toast.error('فشل في إضافة البرنامج'),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا البرنامج؟')) return;
    try {
      await programsService.delete(id);
      toast.success('تم الحذف بنجاح');
      queryClient.invalidateQueries({ queryKey: ['admin-programs'] });
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">إدارة البرامج</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              <Plus className="w-4 h-4" /> إضافة برنامج جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة برنامج جديد</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان البرنامج</Label>
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
              <Button type="submit" className="w-full" disabled={createProgram.isPending}>
                {createProgram.isPending ? 'جاري الحفظ...' : 'حفظ'}
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
                <TableHead className="text-right font-semibold text-slate-700">الحالة</TableHead>
                <TableHead className="text-left font-semibold text-slate-700">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">جاري التحميل...</TableCell>
                </TableRow>
              ) : programs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-slate-500">لا توجد برامج مضافة</TableCell>
                </TableRow>
              ) : (
                programs?.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium text-slate-800">{program.title}</TableCell>
                    <TableCell className="text-slate-600">{new Date(program.createdAt).toLocaleDateString('ar-DZ')}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">نشط</span>
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-red-600" onClick={() => handleDelete(program.id)}>
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
