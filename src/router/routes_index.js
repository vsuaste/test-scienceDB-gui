import BookRoutes from './BookRoutes'
import DogRoutes from './DogRoutes'
import PersonRoutes from './PersonRoutes'
import ProjectRoutes from './ProjectRoutes'
import PublisherRoutes from './PublisherRoutes'
import ResearcherRoutes from './ResearcherRoutes'
import SpecieRoutes from './SpecieRoutes'
import individualRoutes from './individualRoutes'
import transcript_countRoutes from './transcript_countRoutes'

let child_paths = []

      child_paths.push(...BookRoutes)
      child_paths.push(...DogRoutes)
      child_paths.push(...PersonRoutes)
      child_paths.push(...ProjectRoutes)
      child_paths.push(...PublisherRoutes)
      child_paths.push(...ResearcherRoutes)
      child_paths.push(...SpecieRoutes)
      child_paths.push(...individualRoutes)
      child_paths.push(...transcript_countRoutes)
  
export default child_paths
