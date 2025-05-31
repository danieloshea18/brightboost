// src/components/TeacherDashboard/MainContent.tsx

import React from 'react';
import LessonTable from './LessonTable';

const MainContent = ({ lessons }) => (
  <section className="w-full max-w-5xl mx-auto">
    <LessonTable lessons={lessons} />
  </section>
);

export default MainContent;
