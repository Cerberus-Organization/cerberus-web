import { InlineCode } from "@/once-ui/components";

// Definindo a equipe
const team = [
  {
    firstName: "Emanuel",
    lastName: "",
    get name() {
      return this.firstName;
    },
    role: "Pentester &\nFullstack Developer",
    avatar: "/images/avatar.jpg", // Usar a mesma imagem temporariamente
    location: "America/Fortaleza",
    languages: ["Portuguese", "English"],
  },
  {
    firstName: "Thiago",
    lastName: "",
    get name() {
      return this.firstName;
    },
    role: "Fullstack Developer",
    avatar: "/images/avatar.jpg", // Usar a mesma imagem temporariamente
    location: "America/Fortaleza",
    languages: ["Portuguese", "English"],
  }
];

// Mantendo person para compatibilidade com código existente
const person = team[0];

const newsletter = {
  display: false,
  title: <>Subscribe to Our Newsletter</>,
  description: (
    <>
      We occasionally write about security, development, and share thoughts on the intersection of
      technology and business.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system/nextjs-starter",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/once-ui/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:example@gmail.com",
  },
];

const home = {
  label: "Home",
  title: "Cerberus Security Team",
  description: "Security and development services by our expert team",
  headline: <>Security experts and developers</>,
  subline: (
    <>
      We are a team of security specialists and developers focused on delivering
      <br /> high-quality solutions for your business needs.
    </>
  ),
};

const about = {
  label: "About Us",
  title: "About Us",
  description: "Meet our team of security and development experts",
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Our Team",
    description: (
      <>
        We are a specialized team focused on cybersecurity and software development, 
        combining expertise in penetration testing and full-stack development to deliver
        secure and efficient solutions.
      </>
    ),
  },
  work: {
    display: false,
    title: "Work Experience",
    experiences: []
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Security & Development Blog",
  description: "Read our latest articles and insights",
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "Our Projects",
  description: "Security and development projects by our team",
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "Our Photo Gallery",
  description: "A collection of our work and team photos",
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, team, social, newsletter, home, about, blog, work, gallery };
