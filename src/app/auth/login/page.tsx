import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

interface Props {
  searchParams : {
    callbackUrl : string;
  }
}

export default function LoginPage({ searchParams } : Props) {
  const { callbackUrl } = searchParams;
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={ `${ titleFont.className } text-4xl mb-5 text-center` }>SIGN IN</h1>
      <LoginForm callbackUrl={callbackUrl}/>
    </div>
  );
}