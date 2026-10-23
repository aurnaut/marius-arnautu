import React, { useEffect, useRef, useState } from "react";

import EsgReportingCover from './esg-reporting-cover';
import DesignSystemCover from './design-system-cover';
import AnalysisDashboardsCover from './analysis-dashboards-cover';
import AiKnowledgeProposalsCover from './ai-knowledge-proposals-cover';
import PortfolioCover from './portfolio-cover';
import CollectionCasePortalCover from './collection-case-portal-cover';
import SieraEsgAnalyticsCover from './siera-esg-analytics-cover';
import BrandingCover from './branding-cover';
import ArnautusLibraryCover from './arnautus-library-cover';
import SneakerzCover from './sneakerz-cover';
import TedxCoventryCover from './tedx-coventry-cover';

// Covers drawn inline, by the slug of the post they're for, to play at the top of their case study, in a CoverHero.
// Some covers loop for as long as they're playing. The rest play through once and back, so the hero plays and stops
// them in turn, giving them long enough to play through and be seen each way (cycle, in milliseconds).
export const covers = {
  '/projects/esg-reporting/': { Cover: EsgReportingCover, cycle: 4000 },
  '/projects/design-system/': { Cover: DesignSystemCover },
  '/projects/analysis-dashboards/': { Cover: AnalysisDashboardsCover },
  '/projects/ai-knowledge-proposals/': { Cover: AiKnowledgeProposalsCover },
  '/projects/portfolio/': { Cover: PortfolioCover, cycle: 3000 },
  '/projects/collection-case-portal/': { Cover: CollectionCasePortalCover },
  '/projects/siera-esg-analytics/': { Cover: SieraEsgAnalyticsCover },
  '/projects/branding/': { Cover: BrandingCover, cycle: 5500 },
  '/projects/arnautus-library/': { Cover: ArnautusLibraryCover, cycle: 3500 },
  '/projects/sneakerz/': { Cover: SneakerzCover },
  '/projects/tedx-coventry/': { Cover: TedxCoventryCover },
};

// Blown up, the covers' shapes cover more ground in the same time, so the hero plays them this many times slower
const HERO_SLOWDOWN = 2;

// A post's cover, large, playing: from as soon as it's on the page, and for a cover that plays through once,
// back and forth, a cycle each way, for as long as it's there.
export const CoverHero = ({ slug, title }) => {
  const { Cover, cycle } = covers[slug] || {};
  const [playing, setPlaying] = useState(false);
  const hero = useRef(null);

  useEffect(() => {
    setPlaying(true);
    if (!cycle) return undefined;
    const timer = setInterval(() => setPlaying(isPlaying => !isPlaying), cycle * HERO_SLOWDOWN);
    return () => clearInterval(timer);
  }, [cycle]);

  // Each change of playing starts the cover's transitions and animations afresh, so slow them all down, delays included
  useEffect(() => {
    if (!hero.current?.getAnimations) return;
    hero.current.getAnimations({ subtree: true }).forEach(animation => {
      animation.playbackRate = 1 / HERO_SLOWDOWN;
    });
  }, [playing]);

  if (!Cover) return null;

  return (
    <div ref={hero} className={playing ? 'cover-hero cover-hero--playing' : 'cover-hero'}>
      <Cover title={title} />
    </div>
  );
};
