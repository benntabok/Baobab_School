/**
 * Transforms Course Metadata into Calendar Events
 * Optimized for Baobab School of Computing Dashboard
 */
export const syncCourseToCalendar = (courses) => {
  if (!courses) return [];
  let calendarEvents = [];

  courses.forEach((course) => {
    // Default to the current date if start_date is missing
    const startDate = new Date(course.start_date || '2026-03-30'); 
    
    // 1. Add the Main Course Block (The overall Mission)
    const missionColor = getLanguageColor(course.language || course.type);
    
    calendarEvents.push({
      id: course.slug || course.title.toLowerCase().replace(/\s+/g, '-'),
      title: `MISSION: ${course.title}`,
      start: startDate.toISOString().split('T')[0],
      end: addDays(startDate, course.duration_days || 10).toISOString().split('T')[0],
      backgroundColor: missionColor,
      borderColor: 'transparent',
      display: 'block', // Ensures it shows as a solid bar
      extendedProps: { 
        type: 'course_main',
        language: course.language 
      }
    });

    // 2. Add Phase Breakdown (Daily tactical objectives)
    if (course.phases && Array.isArray(course.phases)) {
      course.phases.forEach((phase, index) => {
        const phaseDate = addDays(startDate, index);
        calendarEvents.push({
          id: `${course.slug || 'course'}-phase-${index}`,
          title: `[P${index + 1}] ${phase.name}`,
          start: phaseDate.toISOString().split('T')[0],
          allDay: true,
          backgroundColor: 'transparent',
          textColor: missionColor, // Sub-tasks use the text color of their parent language
          borderColor: missionColor,
          extendedProps: { type: 'phase_task' }
        });
      });
    }
  });

  return calendarEvents;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const getLanguageColor = (lang) => {
  const colors = {
    c: '#701c1c',          // Baobab Deep Red
    sys: '#701c1c',        // Alignment with your Dashboard 'sys' type
    powershell: '#0078D4', // Microsoft Blue
    bash: '#4E9A06',       // Terminal Green
    python: '#3776AB',     // Logic Blue
    script: '#4E9A06'      // Alignment with Dashboard 'script' type
  };
  return colors[lang] || '#64748b'; // Default to Slate-500
};