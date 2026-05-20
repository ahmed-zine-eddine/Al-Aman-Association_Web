import { createFileRoute } from '@tanstack/react-router';
import { useAdminGallery } from '@/hooks/use-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageIcon, Plus, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { galleryService } from '@/lib/api-services';
import { useQueryClient } from '@tanstack/react-query';

export const Route = createFileRoute('/_admin/gallery')({
  component: AdminGallery,
});

function AdminGallery() {
  const { data: albums, isLoading } = useAdminGallery();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الألبوم؟')) return;
    try {
      await galleryService.deleteAlbum(id);
      toast.success('تم الحذف بنجاح');
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
    } catch {
      toast.error('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">إدارة المعرض</h1>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
          <Plus className="w-4 h-4" /> إضافة ألبوم جديد
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">جاري التحميل...</div>
      ) : albums?.length === 0 ? (
        <div className="text-center py-8 text-slate-500">لا توجد ألبومات مضافة</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums?.map((album) => (
            <Card key={album.id} className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video bg-slate-100 relative group flex items-center justify-center">
                {album.coverUrl ? (
                  <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-slate-300" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Upload className="w-4 h-4" /> رفع صور
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(album.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-800 mb-1">{album.title}</h3>
                <p className="text-sm text-slate-500">{album.items?.length || 0} صورة</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
