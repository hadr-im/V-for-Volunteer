import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyAttend from "../components/WhyAttend";
import ProjectLead from "../components/ProjectLead";
import Opportunities from "../components/Opportunities";
import Marquee from "../components/Marquee";
import Closing from "../components/Closing";

export default function Home({ ready = true }) {
  return (
    <>
      <Navbar />
      <main>
        <Hero play={ready} />
        <WhyAttend />
        <ProjectLead />
        <Opportunities />
        <Marquee />
        <Closing />
      </main>
    </>
  );
}
