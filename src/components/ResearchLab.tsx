import React from 'react';
import SubpageHeader from './SubpageHeader';
import Research from './Research';
import Projects from './Projects';
import Publications from './Publications';
import LabScene from './3d/LabScene';

const ResearchLab = () => {
  return (
    <section className="relative w-full bg-void min-h-screen text-left">
      {/* 3D Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
        <LabScene />
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-end pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="pointer-events-auto">
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
          </div>
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="relative z-30">
        <Research />
        <Publications />
        <Projects />
      </div>
    </section>
  );
};

export default ResearchLab;
