import { Suspense } from "react";
import { MinimalHeader } from "@/components/MinimalHeader";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <MinimalHeader />
      <div className="flex flex-1 items-center justify-center bg-panel-blue px-4 py-10">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
