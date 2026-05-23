export type ProfileData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  instagram: string;
  summary: string;
  quickStats: { label: string; value: string; tone: string }[];
  experience: {
    role: string;
    company: string;
    period: string;
    kind: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
    result: string;
    notes: string;
  }[];
  certifications: string[];
  works: {
    title: string;
    type: string;
    year: string;
    description: string;
    metrics: string[];
    link?: string;
  }[];
  publications: string[];
  vision: string;
  aspirations: string[];
};

export const profileData: ProfileData = {
  name: "Anshul Bhalla",
  title:
    "MBA Finance candidate at IIM Tiruchirappalli | Equity Research | Valuation | AIF Deal Intelligence",
  email: "anshul.bhalla23@gmail.com",
  phone: "+91-9896377479",
  location: "India",
  linkedin: "https://in.linkedin.com/in/anshul-bhalla23",
  instagram: "",
  summary:
    "MBA Finance candidate at IIM Tiruchirappalli with a strong foundation in equity research, valuation, alternative investment analysis, and public-sector execution. My work combines financial modelling, investment screening, AI-enabled research workflows, and structured communication for investors, founders, and decision-makers. I am focused on building credible finance products, research-led investment opinions, and practical tools that convert fragmented company data into clear strategic insight.",
  quickStats: [
    { label: "Companies screened", value: "10,000+", tone: "blue" },
    { label: "MCA / ROC filings", value: "120+", tone: "green" },
    { label: "Operational efficiency lift", value: "80%", tone: "amber" },
    { label: "CAT aspirants mentored", value: "500+", tone: "rose" },
  ],
  experience: [
    {
      role: "Investment Research Intern",
      company: "Green Flow Ventures (AIF I, Credora Capital)",
      period: "Jan 2026 - Present",
      kind: "Current Company",
      bullets: [
        "Architected Smart Scouter, an AI-powered deal intelligence platform integrating five AI models across 10,000+ MCA-extracted companies.",
        "Built a seven-parameter investment scoring engine covering promoter quality, compliance posture, capital structure, scalability, sector tailwinds, and IPO-readiness indicators.",
        "Screened 120+ MCA/ROC filings and identified 15+ high-conviction opportunities across optical fibre manufacturing, healthcare, food processing, EPC, and industrial sectors.",
        "Mapped HNIs, family offices, merchant bankers, and fund managers to strengthen fundraising pipelines, strategic outreach, and regional deal-origination coverage.",
      ],
    },
    {
      role: "Compliance & Administrative Officer",
      company: "Municipal Corporation, Ambala",
      period: "Jul 2022 - Jun 2025",
      kind: "Previous Company",
      bullets: [
        "Monitored operations of 300+ field personnel across 20 municipal wards through KPI-led workflows, reporting discipline, and performance-monitoring dashboards.",
        "Managed tender documentation and compliance for engineering tenders ranging from INR 5 lakh to INR 120+ crore, supporting transparent public-sector execution.",
        "Processed 200+ RTI applications as ASPIO and reduced response friction through standardized documentation, tracking, and escalation protocols.",
        "Validated 800+ voter records and resolved 150+ Swachh Bharat Mission public grievances through structured complaint management and municipal coordination.",
      ],
    },
  ],
  education: [
    {
      degree: "MBA - Finance Majors",
      institution: "IIM Tiruchirappalli, Tamil Nadu",
      period: "2025 - 2027",
      result: "Pursuing",
      notes: "Focused on capital markets, valuation, investment research, and finance strategy.",
    },
    {
      degree: "B.Sc. - Physics, Chemistry, Mathematics",
      institution: "Kurukshetra University, Haryana",
      period: "2019 - 2022",
      result: "8.5/10",
      notes: "Quantitative foundation across analytical sciences and mathematics.",
    },
  ],
  certifications: [
    "NISM Series XV - Research Analyst (SEBI), 2025",
    "NISM Series VIII - Equity Derivatives (SEBI), 2025",
    "NISM Series VII - Securities Operations and Risk Management, 2026",
    "Foundation in Business Strategy - Coursera, University of Virginia, 2025",
    "Advanced Valuation & Financial Modelling - Koed Learning, 2025",
    "Advanced Valuation & Financial Modelling - The Valuation School by CA Parth Verma, 2026",
    "FRM Level 1 - Appearing Aug 2026",
  ],
  works: [
    {
      title: "Smart Scouter",
      type: "AI Deal Intelligence Platform",
      year: "2026",
      description:
        "A deployed AI-powered screening platform that converts MCA-extracted company data into IPO-readiness and investment-attractiveness intelligence. The system is designed for deal sourcing, pre-IPO prioritisation, and analyst-level company screening.",
      metrics: ["5 AI models", "10,000+ companies", "0-100 score", "7-parameter engine"],
      link: "https://scoutersmarter.vercel.app/",
    },
    {
      title: "IPO Readiness & Scoring System",
      type: "Flagship Finance App",
      year: "2026",
      description:
        "A professional IPO-readiness platform that scores companies, explains investment attractiveness, and supports structured deal screening for investors, analysts, and AIF-style research workflows. The product is built to turn uploaded company data into clearer investment narratives.",
      metrics: ["IPO readiness", "AI scoring", "Company upload", "Investor dashboard"],
      link: "https://ipo-website-alpha.vercel.app/",
    },
    {
      title: "Disha",
      type: "AI Social Impact Platform",
      year: "Building",
      description:
        "An AI-powered career guidance platform for Indian students from Tier-2, Tier-3, rural, and government-school backgrounds. Disha is designed as a decision engine: a student answers simple questions, then receives a practical career roadmap covering exams, subjects, scholarships, education loans, government support, resources, and backup plans.",
      metrics: ["Student onboarding", "Career roadmap", "Scholarships", "Groq + Tavily agent"],
    },
    {
      title: "LinkedIn Parser",
      type: "Professional Data Tool",
      year: "Building",
      description:
        "A professional-data tool concept that parses LinkedIn profile information into structured insights for networking, research, outreach prioritisation, and personal-brand workflows. The goal is to make profile intelligence easier to search, compare, and act on.",
      metrics: ["Profile parsing", "Structured data", "Networking", "Automation"],
    },
    {
      title: "Autoshop",
      type: "Business Website / App",
      year: "Building",
      description:
        "A digital product for an auto-service business experience, designed to present services, improve customer interaction, and support a more modern local-business workflow. The product direction focuses on discoverability, service clarity, and customer trust.",
      metrics: ["Local business", "Service flow", "Customer interface", "Web app"],
    },
    {
      title: "Tata Power Integrated DCF & Equity Valuation Model",
      type: "Financial Model",
      year: "2025",
      description:
        "A five-year integrated DCF model with revenue drivers, WACC assumptions, EBITDA bridge, capex schedule, scenario analysis, and comparable valuation. The model builds an investment thesis around Tata Power's renewables-led growth strategy.",
      metrics: ["DCF", "EV/EBITDA", "P/E comps", "Bull/base/bear scenarios"],
    },
    {
      title: "Valuing S&P BSE Sensex",
      type: "Methodology Paper",
      year: "2026",
      description:
        "A Damodaran-inspired DDM/FCFE proxy valuation of the BSE Sensex using dividend yield, buyback yield, earnings growth, and risk-free-rate assumptions. The paper documents methodology choices and flags ERP instability and concentration risk.",
      metrics: ["1.19%-1.31% yield", "11.76% EPS CAGR", "6.64% risk-free rate"],
    },
    {
      title: "The Tale of Volatility",
      type: "Independent Research",
      year: "2025-26",
      description:
        "A comparative risk analysis of S&P 500, Nifty 50, Nifty 500, and BSE Sensex across 5-, 10-, and 20-year windows. The research studies volatility reversal patterns and links Indian market stability to structural domestic capital flows.",
      metrics: ["Daily closing data", "2006-2026", "Volatility reversal thesis"],
    },
    {
      title: "Beyond the Standard CAPM",
      type: "Independent Research",
      year: "2025-26",
      description:
        "An augmented CAPM framework incorporating country-risk exposure, bottom-up beta, ERP calibration, and geographic revenue concentration for Indian equities. The framework was stress-tested across Reliance Industries, TCS, and Mahindra & Mahindra.",
      metrics: ["Bottom-up beta", "ERP calibration", "Reliance", "TCS", "M&M"],
    },
  ],
  publications: [
    "Published Top 5 IPOs in India analysis in Finspire, a finance magazine co-created by six IIMs.",
    "Published independent research on Indian market volatility and augmented CAPM through LinkedIn.",
  ],
  vision:
    "To build a career at the intersection of equity research, investment banking, private equity, and AI-enabled financial intelligence, while producing rigorous research and practical products that make Indian capital markets easier to understand, evaluate, and access.",
  aspirations: [
    "Become a high-conviction equity research and investment professional.",
    "Build finance tools that combine rigorous valuation logic with modern AI workflows.",
    "Publish practical research on Indian equities, IPOs, volatility, and emerging-market valuation.",
    "Create a strong personal brand through dashboards, research notes, models, and public writing.",
  ],
};
