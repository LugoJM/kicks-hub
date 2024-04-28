import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getAllCountries, getStoredUserAddress } from '@/actions';
import { auth } from '@/auth.config';

export default async function AddressPage() {

  const session = await auth();
  const countries = await getAllCountries();
  const storedUserAddress = await getStoredUserAddress(session!.user.id) ?? undefined;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery Address" />
        <AddressForm countries={countries} savedUserAddress={storedUserAddress} />
      </div>
    </div>
  );
}