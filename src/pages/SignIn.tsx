import { Button } from '@/components/atoms';
import { Checkbox, Input } from '@/components/molecules';

export const Signin: React.FC = () => {
  return (
    <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
      <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-4 grid h-28 place-items-center">
        <h3 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
          Sign In
        </h3>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <Checkbox label="block email" />

        <div className="relative w-full min-w-[200px] h-11">
          <Input label="Email" className="h-11" />
        </div>
        <div className="relative w-full min-w-[200px] h-11">
          <Input label="Password" className="h-11" />
        </div>
        <div className="relative w-full min-w-[200px] h-11">
          <Button className="h-11">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};