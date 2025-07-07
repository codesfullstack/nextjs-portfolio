import styles from './Tools.module.css';
import { useState, useEffect, useRef } from 'react';

const titles = [
  "UX/UI",
  "Frontend",
  "Backend",
  "Data Base",
  "DevOps & Workflow",
  "Testing & QA",
  "Dev"
];

const contents = [
  [ // UX/UI
    { name: "Flexbox", icon: "https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-images-collage-modern-design-template-grids-layout-grid-filled-tal-revivo.png" },
    { name: "Bootstrap", icon: "https://img.icons8.com/ios-filled/50/bootstrap.png" },
    { name: "Material UI", icon: "https://img.icons8.com/color/48/material-ui.png" },
    { name: "Responsive", icon: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-responsive-design-new-media-flaticons-lineal-color-flat-icons-2.png" },
    { name: "SEO", icon: "https://img.icons8.com/external-smashingstocks-outline-color-smashing-stocks/66/external-SEO-seo-and-development-smashingstocks-outline-color-smashing-stocks-2.png" },
    { name: "Analytics", icon: "https://img.icons8.com/color/48/google-analytics.png" },
  ],
  [ // Frontend
    { name: "HTML", icon: "https://img.icons8.com/plasticine/100/html-5.png" },
    { name: "CSS", icon: "https://img.icons8.com/color/48/css3.png" },
    { name: "JavaScript", icon: "https://img.icons8.com/color/48/javascript--v1.png" },
    { name: "React", icon: "https://img.icons8.com/officel/80/react.png" },
    { name: "Angular", icon: "https://img.icons8.com/fluency/48/angularjs.png" },
    { name: "JWT ", icon: "https://img.icons8.com/color/48/java-web-token.png" },
    { name: "vite", icon: "https://img.icons8.com/color/48/vite.png" },
    { name: "Nextjs", icon: "https://img.icons8.com/color/48/nextjs.png" },
    { name: "Typescript", icon: "https://img.icons8.com/color/48/typescript.png" },
    { name: "Redux", icon: "https://img.icons8.com/ios/48/redux.png" },
  ],
  [ // Backend
    { name: "Node", icon: "https://img.icons8.com/color/48/nodejs.png" },
    { name: "Spring Boot", icon: "https://img.icons8.com/officel/80/spring-logo.png" },
    { name: "Java EE", icon: "https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png" },
    { name: "REST", icon: "https://img.icons8.com/water-color/100/api-settings.png" },
    { name: "express", icon: "https://img.icons8.com/officel/48/express-js.png" },
  ],
  [ // Data Base
    { name: "MySql", icon: "https://img.icons8.com/fluency/48/mysql-logo.png" },
    { name: "MongoDB", icon: "https://img.icons8.com/color/48/mongodb.png" },
    { name: "PostgreSQL", icon: "https://img.icons8.com/ios/50/postgreesql.png" },
    { name: "Oracle", icon: "https://img.icons8.com/ios/50/oracle-logo.png" },
    { name: "PL/SQL", icon: "https://img.icons8.com/plasticine/100/oracle-pl-sql--v3.png" },
    { name: "mongoose", icon: "https://img.icons8.com/color/48/mongoose.png" },
    { name: "Hibernate", icon: "https://cdn.worldvectorlogo.com/logos/hibernate.svg" },
  ],
  [ // DevOps & Workflow
    { name: "Git", icon: " https://img.icons8.com/plasticine/100/github.png" },
    { name: "GitLab", icon: "https://img.icons8.com/color/48/gitlab.png" },
    { name: "Bitbucket", icon: "https://img.icons8.com/color/48/bitbucket.png" },
    { name: "Jenkins", icon: "https://img.icons8.com/color/48/jenkins.png" },
    { name: "AWS", icon: "https://img.icons8.com/color/48/amazon-web-services.png" },
    { name: "Kubernetes ", icon: "https://img.icons8.com/color/48/kubernetes.png" },
    { name: "Jira", icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/50/external-jira-a-proprietary-issue-tracking-product-developed-by-atlassian-that-allows-bug-tracking-logo-shadow-tal-revivo.png" },

  ],
  [ // Testing & QA
    { name: "Postman", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png" },
    { name: "Json", icon: "https://img.icons8.com/stickers/100/placeholder-thumbnail-json-1.png" },
    { name: "XML", icon: "https://img.icons8.com/external-fauzidea-flat-fauzidea/64/external-xml-file-file-extension-fauzidea-flat-fauzidea.png" },
    { name: "Testing", icon: "https://img.icons8.com/arcade/64/test.png" },
    { name: "Planning", icon: "https://img.icons8.com/color/48/strategy-board.png" },
  ],
  [ // Herramientas
    { name: "VS Code", icon: "https://img.icons8.com/plasticine/100/visual-studio-code-2019.png" },
    { name: "IntelliJ", icon: "https://img.icons8.com/color/48/intellij-idea.png" },
    { name: "eclipse ", icon: "https://img.icons8.com/ios-filled/50/java-eclipse.png" },
    { name: "DBeaver ", icon: "https://img.icons8.com/dusk/64/dbeaver.png" },
    { name: "Oracle PL", icon: "https://img.icons8.com/plasticine/100/oracle-pl-sql--v3.png" },
    { name: "MyBatis", icon: " https://img.icons8.com/ultraviolet/40/mybatis.png" },
  ]
];

export default function Tools({ language }: { language: string }) {
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);

  const updateStack = () => {
    const cards = stackRef.current?.children;
    if (!cards) return;

    const total = contents.length;

    Array.from(cards).forEach((card, index) => {
      let y = 0;
      let z = 0;
      let width = 100;
      let left = 0;

      if (!hovering) {
        if (index === current) {
          y = 0;
          z = 100;
          width = 100;
          left = 0;
        } else {
          width = 90;
          left = (100 - width) / 2;
        }
      } else {
        if (index === current) {
          y = 80;
          z = 100;
          width = 100;
          left = 0;
        } else {
          const relIndex = index > current ? index - current : total - current + index;
          y = 80 - relIndex * 10;
          width = 100 * Math.pow(0.9, relIndex);
          left = (100 - width) / 2;
          z = 100 - relIndex;
        }
      }

      (card as HTMLElement).style.transform = translateY(${ y }px);
      (card as HTMLElement).style.zIndex = z.toString();
      (card as HTMLElement).style.width = ${ width }%;
      (card as HTMLElement).style.left = ${ left }%;
      (card as HTMLElement).style.opacity = '1';
    });
  };

  useEffect(() => {
    updateStack();
  }, [current, hovering]);

  const levelColors = [
    'hsl(210, 100%, 40%)', // Azul oscuro
    'hsl(220, 100%, 40%)', // Azul medio
    'hsl(230, 100%, 40%)', // Azul-violeta
    'hsl(240, 100%, 40%)', // Púrpura
    'hsl(250, 100%, 40%)', // Violeta intenso
    '#007BFF',             // Azul brillante (Bootstrap blue)
    '#DC3545',             // Rojo clásico (Bootstrap red)
  ];

  const translations = {
    EN: {
      tittle: "Tech Stack",
    },
    ES: {
      tittle: "Stack Tecnológico",
    }
  };

  const currentTranslation = translations[language as 'EN' | 'ES'];

  return (
    <div className={styles.container}>
      <div>
        {/* <h3 className={styles.mainTitle}>Tech Stack</h3> */}
        <h2 className={styles.mainTitle}>{currentTranslation.tittle}</h2>
      </div>

      <div
        className={styles.tabs}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {titles.map((title, index) => (
          <button
            key={index}
            className={current === index ? styles.active : ''}
            onClick={() => setCurrent(index)}
          >
            {title}
          </button>
        ))}
      </div>

      <div className={styles.stackContainer} ref={stackRef}>
        {contents.map((content, index) => (
          <div
            className={styles.card}
            key={index}

            style={{
              background: linear - gradient(135deg, ${ levelColors[index % 7]}, #888),
              color: 'var(--level-11)'
            }}
          >
            <h2 className={styles.titles}>{titles[index]}</h2>
            <div className={styles.iconGrid}>
              {content.map((item, i) => (
                <div key={i} className={styles.iconCard}>
                  <img src={item.icon} alt={item.name} className={styles.iconImage} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}