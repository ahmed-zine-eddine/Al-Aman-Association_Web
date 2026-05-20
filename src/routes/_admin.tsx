import { createFileRoute } from '@tanstack/react-router';
import { AdminLayout } from '@/components/admin/admin-layout';

export const Route = createFileRoute('/_admin')({
  component: AdminLayout,
});
