// src/utils/calendarHelper.js

/**
 * Transforms Course Metadata into Calendar Events
 * @param {Array} courses - Array of objects parsed from Markdown frontmatter
 * @returns {Array} events - Formatted for a Calendar UI
 */
export const syncCourseToCalendar = (courses) => {
  let calendarEvents = [];

  courses.forEach((course) => {
    const startDate = new Date(course.start_date || '2026-03-30'); // Default to today
    
    // 1. Add the Main Course Block
    calendarEvents.push({
      id: course.slug,
      title: `MISSION: ${course.title}`,
      start: startDate.toISOString(),
      end: addDays(startDate, course.duration_days || 10).toISOString(),
      color: getLanguageColor(course.language),
      type: 'course_main'
    });

    // 2. Add Phase Breakdown (The "Immersive" sub-tasks)
    if (course.phases) {
      course.phases.forEach((phase, index) => {
        const phaseStart = addDays(startDate, index);
        calendarEvents.push({
          id: `${course.slug}-phase-${index}`,
          title: `[PHASE ${index + 1}] ${phase.name}`,
          start: phaseStart.toISOString(),
          allDay: true,
          type: 'phase_task'
        });
      });
    }
  });

  return calendarEvents;
};

// Helper to add days to a date object
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Logic for "Visual Soft Power" (Color coding by language)
const getLanguageColor = (lang) => {
  const colors = {
    c: '#E94E77',          // Systems Red
    powershell: '#0078D4', // Microsoft Blue
    bash: '#4E9A06',       // Terminal Green
    python: '#3776AB'      // Logic Blue
  };
  return colors[lang] || '#333333';
};