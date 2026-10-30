import portrait from './assets/portrait.jpg';
// Everything here comes from the résumé. Empty strings are placeholders to fill in.
export const SITE={
  name:'Bharat Bassi',
  email:'bharatbassi8@gmail.com',
  phone:'+917053320627',
  linkedin:'https://linkedin.com/in/bharatbassi',
  github:'', // TODO: not in the résumé. Add your GitHub URL.
  portrait, // TODO: drop your own photo at public/portrait.jpg
};
export const PROJECTS=[
 {title:'DAZN Global Sentiment Dashboard',big:'10+',unit:'markets',tools:'Power BI',color:'var(--yellow)',
  what:'A multi-market social listening platform covering real-time sentiment, share of voice, word clouds, buzz trends and AI-powered recommendations.',
  role:'Developed it at DAZN. Regional and global leadership use it every week for brand strategy reviews.'},
 {title:'AI-Assisted VBA Reporting Automation',big:'85%',unit:'less prep time',tools:'VBA, Excel',color:'var(--red)',
  what:'An end-to-end macro suite for weekly social listening reports. Preparation dropped from 3–4 hours to 30–40 minutes.',
  role:'Engineered the automation at DAZN, freeing analyst time for insight work.'},
 {title:'Stock Market Analytics Dashboard',big:'NSE/BSE',unit:'sector trends',tools:'Python, Tableau',color:'var(--blue)',
  what:'Visualises NSE and BSE sector trends, moving averages and investment signals, with interactive filtering.',role:'Personal analytics project.'},
 {title:'IPL Insights Dashboard',big:'10',unit:'seasons of IPL data',tools:'SQL, Power BI',color:'var(--yellow)',
  what:'Surfaces win-rate patterns by venue, toss outcome and team composition.',role:'Personal analytics project.'},
];
export const ROLES=[
 {when:'Jul 2025 – Present',org:'DAZN Software Private Limited, Hyderabad',role:'Social Media Analyst, Social Listening & ORM',pts:['Runs brand intelligence for 10+ international markets with Sprout Social and Zendesk.','Root cause analysis on Daily Production Reports lifted Service Level by 35%. Named Star of the Month.','Reports SLA adherence, FRT, CSAT and engagement for a 17-member social team.']},
 {when:'May 2023 – Jul 2025',org:'Interactive Avenues (IPG Mediabrands), Delhi',role:'Senior ORM Executive',pts:['Lead ORM and social listening analyst for MG Motors.','Ran crisis ORM for CEAT Tyres and Apollo Tyres.','Cut reporting turnaround from 3 days to same day with Excel and Looker Studio.']},
 {when:'Mar 2021 – May 2023',org:'The Social Booth / Step1 Advertising, Delhi',role:'ORM Executive',pts:['Covered 21+ channels for Delhi International Airport with first response under 7 minutes.','Built Power BI sentiment dashboards used in monthly C-suite presentations.']},
 {when:'Sep 2019 – Mar 2021',org:'Catalyst Web Trendz, Delhi',role:'Social Media Executive',pts:['Reported on 8+ brand accounts; average monthly reach grew 25% within 6 months.']},
];
export const SKILLS=[
 ['Listening and reputation','Sprout Social, Zendesk, Konnect Insights, Talkwalker, crisis communication, audience intelligence'],
 ['Analytics and BI','Power BI (DAX, ETL, data modelling), Tableau, Looker Studio, dashboard development'],
 ['Code and data','Python (Pandas, NumPy, Matplotlib, Seaborn), SQL (joins, window functions), VBA automation'],
 ['Reporting','Excel pivot tables, Power Query, advanced formulas, data storytelling, automated reporting'],
 ['Social and ads','Meta Business Suite, Google Ads, Hootsuite, YouTube Studio, X analytics, community management'],
];
export const EDU=[
 ['MBA in Business Analytics (pursuing)','Liverpool John Moores University, 2024 – present'],
 ['Advanced General Management Programme','IMT Ghaziabad, 2024 – 2025'],
 ['BA in Mass Communication','Guru Jambheshwar University of Science & Technology, 2015 – 2018'],
 ['Certifications','Business Analytics (IMS Proschool), Google Data Analytics, Power BI for Data Analysts, HubSpot Social Media Marketing'],
];
