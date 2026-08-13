import About from "../components/sections/About";
import Hero from "../components/sections/Hero";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import ProjectList from "../components/sections/ProjectsList";
import Footer from "../components/sections/Footer";


export default function Home() {
  return (

      <div className="min-h-svh w-full bg-background">
        
        <Hero />
        <About />
        <Skills />
        <Experience />
        <ProjectList/>
        <Footer/>
      </div>
  );
}
