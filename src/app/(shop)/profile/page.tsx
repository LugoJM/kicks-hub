import { auth } from "@/auth.config";
import { Title } from "@/components";
import { IoPersonOutline } from "react-icons/io5";

export default async function ProfilePage() {
  const session = await auth();
  const { id, name, role, email } = session!.user;
  return (
    <>
      <Title title="Profile" />
      <div className="flex flex-col p-2 items-center space-y-4">
        <i className="shadow-lg rounded-full p-8 w-fit">
          <IoPersonOutline size={180} />
        </i>
        <div className="flex text-2xl">
          <span>Usuario: &nbsp;</span>
          <h3 className="font-bold">{name}</h3>
        </div>
        <div className="flex text-2xl">
          <span>Role: &nbsp;</span>
          <h3 className="font-bold">{role}</h3>
        </div>
        <div className="flex text-2xl">
          <span>Email: &nbsp;</span>
          <h3 className="font-bold">{email}</h3>
        </div>
        <span className="text-sm text-black/55">UserID: {id}</span>
      </div>
    </>
  );
}
