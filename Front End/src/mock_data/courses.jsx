// src/data/courses.js

// Generate 100 mock courses with units & lessons
export const courses = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    title: `Course ${id}: ${[
      "Instagram Marketing",
      "Google Adsense",
      "Tennis Backhand Mastery",
      "Frontend Development",
      "Backend Architecture",
      "Machine Learning Foundations",
      "Deep Learning Masterclass",
      "UI/UX Design",
      "Business Startup",
      "Digital Marketing",
      "SEO Optimization",
      "Communication Skills",
      "Public Speaking",
      "Leadership Essentials",
      "Data Analysis",
      "Python Programming",
      "Java Programming",
      "React Fundamentals",
      "NodeJS API Development",
      "Cloud Computing",
      "Cyber Security Basics",
      "Agile Project Management",
      "SQL Database Essentials",
      "MongoDB Crash Course",
      "Blockchain Basics",
      "3D Modeling",
      "Photography",
      "Graphic Design",
      "Video Editing",
      "Sales Psychology",
      "Copywriting Masterclass",
      "Negotiation Strategy",
      "Coaching Skills",
      "Growth Mindset",
      "Critical Thinking",
      "Creative Problem Solving",
      "Financial Literacy",
      "Productivity Hacks",
      "Time Management",
      "Game Development",
      "Mobile App Development",
      "Software Engineering Principles",
      "System Design",
      "DevOps Roadmap",
      "Docker & Kubernetes",
      "AI Tools for Work",
      "Prompt Engineering",
      "E-commerce Strategy",
      "Content Creation Mastery",
    ][index % 50]}`,

    description: `This course provides practical and applicable knowledge in the area of ${
      [
        "digital marketing",
        "technology development",
        "sports performance",
        "business growth",
        "software engineering",
        "AI and machine learning",
        "creative skills",
        "personal development",
        "communication improvement",
        "professional productivity",
      ][index % 10]
    }.`,

    units: [
      {
        unitId: 1,
        unitTitle: "Unit 1: Foundations",
        lessons: [
          {
            lessonId: 1,
            lessonTitle: "Lesson 1: Introduction",
            content:
              "An overview of the core concepts and what you will learn in this unit.",
          },
          {
            lessonId: 2,
            lessonTitle: "Lesson 2: Core Principles",
            content:
              "Deep dive into essential foundations and fundamental theories.",
          },
        ],
      },
      {
        unitId: 2,
        unitTitle: "Unit 2: Advanced Applications",
        lessons: [
          {
            lessonId: 1,
            lessonTitle: "Lesson 1: Real-World Techniques",
            content:
              "Learn advanced strategies commonly implemented in industry.",
          },
          {
            lessonId: 2,
            lessonTitle: "Lesson 2: Hands-on Project",
            content:
              "Apply learned concepts through a practical guided activity.",
          },
        ],
      },
    ],
  };
});
