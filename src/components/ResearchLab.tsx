import React from 'react';
import SubpageHeader from './SubpageHeader';
import Research from './Research'; // We can embed the existing Research component here

const ResearchLab = () => {
  return (
    <section className="relative px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto bg-void min-h-screen text-left">
      <SubpageHeader 
        chapter="ARCHIVE // DISCOVERY"
        title="RESEARCH"
        outlineTitle="LAB"
        description="Consolidated repository of biomedical models, publications, and algorithmic discoveries."
        telemetry={[
          { label: 'STATUS', value: 'ACTIVE' },
          { label: 'PAPERS', value: 'INDEXING' },
        ]}
      />
      
      <div className="mt-8">
        <Research />
      </div>
    </section>
  );
};

export default ResearchLab;
