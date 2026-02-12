import { useAuth } from "@/providers/auth-provider";

export default function Home() {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
