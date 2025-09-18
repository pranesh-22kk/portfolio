const achievements = [
    // Global Certifications
    {
        id: 1,
        category: "Certifications",
        title: "AWS Cloud Practitioner Certification",
        description: "Completed AWS Global Certification demonstrating foundational cloud computing knowledge and AWS services understanding.",
        date: "Feb 2025",
        validity: "Valid until Feb 2028",
        certificateLink: "https://drive.google.com/file/d/1-yWiqVVkMGRZFCZUUDhhrBN4QZ5LQ8NA/view",
        icon: "🏆",
        color: "from-orange-500 to-yellow-500",
        priority: "high"
    },

    // Competition Achievements
    {
        id: 2,
        category: "Competitions",
        title: "1st Prize Winner - SIGNIN2K24",
        description: "Won first place in technical presentation competition showcasing innovative solutions and exceptional presentation skills.",
        date: "2024",
        venue: "Technical Competition",
        icon: "🥇",
        color: "from-yellow-500 to-amber-500",
        priority: "high"
    },
    {
        id: 3,
        category: "Competitions", 
        title: "1st Prize Winner - DEVFORGE'25",
        description: "Secured first position in development competition demonstrating superior coding skills and innovative problem-solving approach.",
        date: "2025",
        venue: "PSG College of Technology, Coimbatore",
        icon: "🏅",
        color: "from-blue-500 to-purple-500",
        priority: "high"
    },

    // Project Achievements
    {
        id: 4,
        category: "Projects",
        title: "ML-Powered CAPTCHA Refinement System",
        description: "Developed an innovative machine learning model to enhance CAPTCHA systems using Python, Flask, and React with advanced ML algorithms.",
        technologies: ["Python", "Flask", "React", "Machine Learning", "Computer Vision"],
        githubLink: "https://github.com/pranesh-22kk/Captcha",
        icon: "🤖",
        color: "from-red-500 to-orange-500",
        priority: "high"
    },
    {
        id: 5,
        category: "Projects",
        title: "Advanced Employee Management System",
        description: "Built comprehensive MERN stack application with CRUD operations, authentication, and role-based access control.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        githubLink: "https://github.com/pranesh-22kk/Employee-System",
        icon: "👥",
        color: "from-teal-500 to-green-500",
        priority: "medium"
    },
    {
        id: 6,
        category: "Projects",
        title: "E-Commerce Platform - Erode Fancy Mart",
        description: "Developed full-featured retail website with inventory management, order tracking, and payment integration.",
        technologies: ["React", "Node.js", "MongoDB", "Razorpay"],
        githubLink: "https://github.com/pranesh-22kk/erode-local",
        liveLink: "https://erode-local.vercel.app/",
        icon: "🛒",
        color: "from-pink-500 to-rose-500",
        priority: "medium"
    },
    {
        id: 7,
        category: "Projects",
        title: "Todo Application with Advanced Features",
        description: "Developed a To-Do App with task management features, deadline reminders, and a user-friendly interface for efficient productivity.",
        technologies: ["React", "Node.js", "MongoDB"],
        githubLink: "https://github.com/pranesh-22kk/Todo-app",
        liveLink: "https://to-do-list-free.vercel.app/",
        icon: "📝",
        color: "from-cyan-500 to-blue-500",
        priority: "medium"
    },

    // Professional Experience
    {
        id: 8,
        category: "Internships",
        title: "Full-Stack Web Development Internship",
        description: "Completed 30-day intensive full-stack development program, gaining hands-on experience with modern web technologies.",
        date: "2024",
        company: "PRODIGY Infotech",
        icon: "�",
        color: "from-purple-500 to-pink-500",
        priority: "medium"
    },
    {
        id: 9,
        category: "Internships",
        title: "Web Development Internship",
        description: "Successfully completed 30-day web development internship, enhancing practical skills in frontend and backend technologies.",
        date: "2024",
        company: "INTERNPE",
        icon: "🌐",
        color: "from-cyan-500 to-blue-500",
        priority: "medium"
    },

    // Technical Skills Achievements
    {
        id: 10,
        category: "Skills",
        title: "Full-Stack Development Mastery",
        description: "Proficient in complete web development stack including React, Node.js, MongoDB, and modern development practices with focus on MERN stack.",
        technologies: ["React", "Node.js", "MongoDB", "HTML/CSS", "JavaScript", "Express.js"],
        icon: "⚡",
        color: "from-violet-500 to-purple-500",
        priority: "medium"
    },
    {
        id: 11,
        category: "Skills", 
        title: "Machine Learning & AI Expertise",
        description: "Demonstrated expertise in ML/AI technologies with practical implementation in CAPTCHA refinement and IoT projects.",
        technologies: ["Python", "Machine Learning", "Flask", "AI", "Computer Vision"],
        icon: "🧠",
        color: "from-emerald-500 to-teal-500",
        priority: "medium"
    },
    {
        id: 12,
        category: "Skills",
        title: "Programming Languages Proficiency", 
        description: "Strong command over multiple programming languages with focus on C and Java for system programming and backend development.",
        technologies: ["C", "Java", "JavaScript", "Python", "SQL"],
        icon: "💻",
        color: "from-blue-500 to-cyan-500",
        priority: "medium"
    },
    {
        id: 13,
        category: "Skills",
        title: "Database Management Systems",
        description: "Experienced in both SQL and NoSQL databases with expertise in MongoDB for modern web applications and SQL for relational data management.",
        technologies: ["SQL", "MongoDB", "Database Design", "Data Modeling"],
        icon: "🗄️",
        color: "from-indigo-500 to-purple-500", 
        priority: "medium"
    }
];

// Categories for filtering
export const achievementCategories = [
    { name: "All", value: "all" },
    { name: "Certifications", value: "Certifications" },
    { name: "Competitions", value: "Competitions" },
    { name: "Internships", value: "Internships" },
    { name: "Projects", value: "Projects" },
    { name: "Skills", value: "Skills" }
];

// Achievement statistics
export const achievementStats = {
    totalAchievements: achievements.length,
    certifications: achievements.filter(a => a.category === "Certifications").length,
    competitions: achievements.filter(a => a.category === "Competitions").length,
    projects: achievements.filter(a => a.category === "Projects").length,
    internships: achievements.filter(a => a.category === "Internships").length,
    skills: achievements.filter(a => a.category === "Skills").length
};

export default achievements;
