import Hero from "../components/Hero";
import PollsList from "../components/PollsList";
import PollingFeatures from "@/components/PollingFeatures";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <PollsList />
      <PollingFeatures />
      <CTA />
    </main>
  );
}
