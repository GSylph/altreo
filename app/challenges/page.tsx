import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getChallenges } from "@/lib/actions/challenges";
import ChallengesGrid from "@/components/challenges/challenges-grid";

export const metadata: Metadata = {
  title: "Learning Challenges - DeFi Trading Education Portal",
  description: "Complete challenges to improve your DeFi trading skills",
};

export default async function ChallengesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const result = await getChallenges();
  const challenges = result.success ? result.data : [];

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">
          Learning Challenges
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Complete challenges to advance your knowledge and skills in decentralized finance trading.
          Each challenge will teach you valuable concepts and strategies.
        </p>
      </div>

      <ChallengesGrid challenges={challenges} />
    </div>
  );
}
