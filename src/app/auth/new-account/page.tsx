import Link from 'next/link';
import { titleFont } from '@/config/fonts';

export default function CreateAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={ `${ titleFont.className } text-4xl mb-5 text-center` }>NEW ACCOUNT</h1>

      <div className="flex flex-col">
        <label htmlFor="name">Full Name</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />

        <label htmlFor="email">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />

        <button          
          className="btn-primary">
          CREATE ACCOUNT
        </button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">OR</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          SIGN IN
        </Link>

      </div>
    </div>
  );
}