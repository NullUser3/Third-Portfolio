import React from 'react'
import { StackTech } from '../utilities/StackTech';

export const content = {
  nav: [
    {
      label: "About",
      href: "/about",
      id:"/"
    },
    {
      label: "Projects",
      href: "/projects",
      id:"/"
    },
    {
      label: "Contact",
      href: "/contact",
      id:"/"
    },
  ],
  StackTech,
  heading: "Ahmed Mohamed",
    languages: [
    "JavaScript",
    "TypeScript",
    "Java",
    "SQL",
    "HTML",
    "CSS",
  ],
  title:"Hi, I'm Ahmed, a Passionate Web Developer",
  about: "I'm Ahmed a Full-Stack Developer with 2+ years of experience in building web apps, i'm passionate about coding and building modern apps with the most recent technologies",
  frameworks: [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Laravel",
    "Spring Boot",
    "Tailwind CSS",
  ],

  tools: [
    "REST APIs",
    "OpenAPI",
    "JWT",
    "Git",
    "Vite",
    "MongoDB",
    "MySQL",
    "Supabase",
    "Docker",
    "Postman",
  ],
projects: [
  {
    id: 1,
    name: "Realtime Chatapp",
    slug: "realtime-chat-app",
    desc: "Chat app with authentication, online status, and WebSocket messaging.",
    long_desc:
      "A full-stack realtime messaging application that allows users to communicate instantly in a modern chat interface. The app supports authentication, user search, and realtime message delivery using WebSockets.",

    images: [
      {
        src: "/images/realtime-chatapp1.png",
        alt: "Realtime Chatapp conversation and user interface",
      },
      {
        src: "/images/realtime-chatapp2.png",
        alt: "Realtime Chatapp login page",
      },
      {
        src: "/images/realtime-chatapp3.png",
        alt: "Realtime Chatapp delete chat message",
      },
    ],

    github: "https://github.com/NullUser3/realtime-chatapp-frontend",
    website: "https://realtime-chatapp-psi-nine.vercel.app/auth/login",
    year: 2026,

    stack: ["Next.js", "Node.js", "MongoDB", "Socket.IO", "Express"],

    features: [
      "User authentication",
      "Realtime messaging",
      "Online/offline user status",
      "User search",
      "Responsive chat interface",
    ],

    highlights: [
      "Implemented realtime communication using WebSockets.",
      "Built authentication and protected user routes.",
      "Designed a responsive messaging interface with realtime UI updates.",
    ],

    contribution:
      "Designed and developed the frontend and backend, including authentication, realtime communication, API integration, and database functionality.",
  },

  {
    id: 2,
    name: "Expense Tracker",
    slug: "expense-tracker",
    desc: "Track income, expenses, and budgets with a clean dashboard interface.",
    long_desc:
      "A modern full-stack expense tracking application that helps users manage their income and expenses efficiently. The app provides real-time budgeting insights, categorized transactions, and a clean dashboard UI for better financial tracking.",

    images: [
      {
        src: "/images/expense-tracker1.png",
        alt: "Expense Tracker financial dashboard",
      },
      {
        src: "/images/expense-tracker2.png",
        alt: "Expense Tracker category interface",
      },
      {
        src: "/images/expense-tracker3.png",
        alt: "Expense Tracker budget and transaction interface",
      },
    ],

    github: "https://github.com/NullUser3/expense-tracker-frontend",
    website: "https://expense-tracker-sooty-xi.vercel.app/",
    year: 2026,

    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "TypeScript",
      "Redux",
      "Vite",
    ],

    features: [
      "Income and expense tracking",
      "Budget management",
      "Categorized transactions",
      "Financial dashboard",
      "Responsive interface",
    ],

    highlights: [
      "Built a full-stack REST API for financial data.",
      "Implemented centralized state management with Redux.",
      "Created a dashboard for visualizing income, expenses, and budgets.",
    ],

    contribution:
      "Developed the frontend and backend, implemented state management, API integration, database operations, and the responsive dashboard interface.",
  },

  {
    id: 3,
    name: "Todo App",
    slug: "todo-app",
    desc: "Todo app with task management and real-time updates using Spring Boot and React.",
    long_desc:
      "A RESTful backend API for the Todo App, built with Java / Spring Boot, containerized with Docker, and powered by Supabase (PostgreSQL) as the cloud database.",

    images: [
      {
        src: "/images/todo-app.png",
        alt: "Todo App task management interface",
      },
    ],

    github: "https://github.com/NullUser3/To-do-backend",
    website: undefined,
    year: 2025,

    stack: [
      "React",
      "Spring Boot",
      "Supabase",
      "PostgreSQL",
      "Redux",
      "Docker",
      "Vite",
    ],

    features: [
      "Task creation and management",
      "RESTful API",
      "Persistent cloud database",
      "State management with Redux",
      "Dockerized backend",
    ],

    highlights: [
      "Designed a RESTful API using Spring Boot.",
      "Mapped application data to PostgreSQL using JPA.",
      "Containerized the backend using Docker.",
    ],

    contribution:
      "Developed the Spring Boot backend and React frontend, implemented REST APIs, database integration, state management, and Docker configuration.",
  },
],
};


export const categories = [
  {
    title: "frontend",
    items: StackTech.filter((tech) => tech.category === "frontend"),
  },
  {
    title: "backend",
    items: StackTech.filter((tech) => tech.category === "backend"),
  },
  {
    title: "Databases & Tools",
    items: StackTech.filter((tech) => tech.category === "Databases & Tools"),
  },
];

///////////////////////////////////////////////////////////////////




