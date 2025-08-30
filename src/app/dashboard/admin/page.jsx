import Admin from "@/app/modules/admin/admin";
import AdminBreadcrumbs from "@/app/modules/admin/admin-breadcrumbs";

const page = () => {
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5">
      <AdminBreadcrumbs />
      <Admin />
    </main>
  );
};

export default page;
