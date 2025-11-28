import Hero from '../components/Hero'
import ProblemSolution from '../components/ProblemSolution'
import TheProduct from '../components/TheProduct'
import Roadmap from '../components/Roadmap'
import PageSEO, { pageSEO } from '../components/PageSEO'

export default function Home() {
  return (
    <>
      <PageSEO {...pageSEO.home} />
      <Hero />
      <ProblemSolution />
      <TheProduct />
      <Roadmap />
    </>
  )
}
