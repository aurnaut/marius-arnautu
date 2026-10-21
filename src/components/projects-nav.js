import React from "react";
import { Link } from "gatsby";

const categories = [
  { label: 'All work', to: '/projects/' },
  { label: 'Design', to: '/projects/design/' },
  { label: 'Development', to: '/projects/development/' },
];

const ProjectsNav = () => (
  <nav className="projects-nav" aria-label="Project categories">
    {categories.map(({ label, to }) => (
      <Link key={to} to={to} activeClassName="is-active">{label}</Link>
    ))}
  </nav>
);

export default ProjectsNav;
