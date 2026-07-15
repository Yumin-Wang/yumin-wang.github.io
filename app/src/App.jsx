import Nav from "./components/Nav";
import Hero from "./components/Hero";
import IdentityPillars from "./components/IdentityPillars";
import FlagshipProjects from "./components/FlagshipProjects";
import Skills from "./components/Skills";
import CourseProjects from "./components/CourseProjects";
import Education from "./components/Education";
import Publications from "./components/Publications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <IdentityPillars />
        <FlagshipProjects />
        <Skills />
        <CourseProjects />
        <Education />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
