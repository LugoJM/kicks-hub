export const dynamic = "force-dynamic";

import { Pagination, Title } from "@/components";
import { getPaginatedUsers } from "@/actions";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const page = searchParams.page ? +searchParams.page : 1;
  const {
    ok,
    totalPages = 1,
    users = [],
  } = await getPaginatedUsers({ page });
  if (!ok) redirect("/");
  return (
    <>
      <Title title="Users Management" />
      <div className="mb-10">
        <UsersTable users={users} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
