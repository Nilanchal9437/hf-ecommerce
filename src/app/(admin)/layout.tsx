import useUser from "@/hooks/cookies";
import MainLayout from "@/layouts";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await useUser();
  return <MainLayout user={user}>{children}</MainLayout>;
}
