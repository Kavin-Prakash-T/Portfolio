import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useScrollToTop } from "./hooks/useScrollToTop";

const App = () => {
  const hasAnimated = useIntersectionObserver();
  const showScrollTop = useScrollToTop();
  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      <Hero hasAnimated={hasAnimated} />
      <About hasAnimated={hasAnimated} />
    </div>
  )
}

export default App;