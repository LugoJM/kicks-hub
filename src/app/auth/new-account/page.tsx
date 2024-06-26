import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export const metadata = {
  title: 'New Account',
  description: 'New Account Page',
};

export default function CreateAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={ `${ titleFont.className } text-4xl mb-5 text-center` }>NEW ACCOUNT</h1>
      <RegisterForm />
    </div>
  );
}