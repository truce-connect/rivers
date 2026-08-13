import AdminLayout from '@/app/admin/layout';
import AdminServices from './services/page';

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminServices />
    </AdminLayout>
  );
}
