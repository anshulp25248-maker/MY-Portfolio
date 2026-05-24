"use client";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Copy,
  Download,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  ImagePlus,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  PenLine,
  Phone,
  Plus,
  Rocket,
  Save,
  Search,
  Sparkles,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, type CSSProperties, ReactNode, useEffect, useMemo, useState } from "react";
import { accents, profile } from "../data/portfolioContent";

const professionalTabs = [
  { href: "/about", label: "About Me", desc: "Bio, stats, skills", icon: UserRound, accent: accents.about },
  { href: "/experience", label: "Experience", desc: "Roles and impact", icon: BriefcaseBusiness, accent: accents.experience },
  { href: "/college", label: "College", desc: "IIM Trichy journey", icon: GraduationCap, accent: accents.college },
  { href: "/works", label: "My Works", desc: "Papers and models", icon: BookOpen, accent: accents.works },
  { href: "/vision", label: "Vision", desc: "Roadmap and beliefs", icon: Rocket, accent: accents.vision },
  { href: "/projects", label: "Projects & Apps", desc: "Built products", icon: Search, accent: accents.projects },
];

const creativeTabs = [
  { href: "/blog", label: "Writing Desk", desc: "Poetry and thoughts", icon: PenLine, accent: accents.blog },
  { href: "/blog?category=poetry", label: "Poetry", desc: "Creative writing", icon: BookOpen, accent: accents.blog },
  { href: "/blog?category=market", label: "Market Musings", desc: "Finance notes", icon: FileText, accent: accents.works },
];

const storageKey = "anshul-portfolio-v3";

export function PortfolioShell({ children, mode = "professional" }: { children: ReactNode; mode?: "professional" | "creative" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [collegeImage, setCollegeImage] = useState("");
  const [cvName, setCvName] = useState("");
  const [documentNames, setDocumentNames] = useState<string[]>([]);
  const [instagram, setInstagram] = useState(profile.instagram);
  const [resumeInput, setResumeInput] = useState("");
  const [rewriteOutput, setRewriteOutput] = useState("");
  const [rewriteLoading, setRewriteLoading] = useState(false);
  const tabs = mode === "creative" ? creativeTabs : professionalTabs;
  const activeTab = professionalTabs.find((tab) => pathname === tab.href) ?? professionalTabs[0];
  const activeAccent = activeTab.accent;

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    const parsed = JSON.parse(saved);
    setProfileImage(parsed.profileImage ?? "");
    setCollegeImage(parsed.collegeImage ?? "");
    setCvName(parsed.cvName ?? "");
    setDocumentNames(parsed.documentNames ?? []);
    setInstagram(parsed.instagram ?? "");
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ profileImage, collegeImage, cvName, documentNames, instagram }));
  }, [profileImage, collegeImage, cvName, documentNames, instagram]);

  const resumeText = useMemo(
    () =>
      `${profile.name}\n${profile.tagline}\n${profile.email} | ${profile.phone} | ${profile.linkedin}\n\n${resumeInput || "Paste raw CV text in the drawer to rewrite it with AI."}`,
    [resumeInput],
  );

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleCollegeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCollegeImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleDocuments = (event: ChangeEvent<HTMLInputElement>) => {
    setDocumentNames((current) => [...current, ...Array.from(event.target.files ?? []).map((file) => file.name)]);
  };

  const handleCv = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setCvName(file.name);
  };

  const rewriteResume = async () => {
    setRewriteLoading(true);
    setRewriteOutput("");
    try {
      const response = await fetch("/api/rewrite-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: resumeInput || resumeText }),
      });
      const data = await response.json();
      setRewriteOutput(data.output ?? data.error ?? "No rewrite output received.");
    } catch {
      setRewriteOutput("Gemini rewrite failed. Check that GEMINI_API_KEY is configured.");
    }
    setRewriteLoading(false);
  };

  const downloadText = () => {
    const blob = new Blob([rewriteOutput || resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Anshul_Bhalla_AI_Resume_Rewrite.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header
        className="border-b border-slate-200 bg-white"
        style={{
          background:
            "radial-gradient(circle at 8% 18%, rgba(37,99,235,0.12), transparent 28rem), radial-gradient(circle at 92% 12%, rgba(217,119,6,0.12), transparent 26rem), #ffffff",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-8 md:px-10 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            className="flex flex-col gap-6 md:flex-row md:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <label className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-600 text-white shadow-soft">
              {profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profileImage} alt="Anshul Bhalla" className="h-full w-full object-cover" />
              ) : (
                <UserRound size={48} />
              )}
              <span className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-blue-600">
                <PenLine size={13} />
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>

            <div>
              <button
                className="mb-3 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu size={14} /> Portfolio Menu
              </button>
              <h1 className="font-display text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{profile.name}</h1>
              <p className="mt-2 max-w-3xl text-base font-semibold md:text-lg" style={{ color: activeAccent }}>{profile.tagline}</p>
              <p className="mt-2 max-w-2xl text-sm italic leading-7 text-slate-500">{profile.heroLine}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Social href={profile.linkedin} icon={<Linkedin size={14} />} label="LinkedIn" color="#0A66C2" />
                <Social href={`mailto:${profile.email}`} icon={<Mail size={14} />} label="Email" color="#2563EB" />
                <Social href={`tel:${profile.phone}`} icon={<Phone size={14} />} label="Call" color="#16A34A" />
                {instagram && <Social href={`https://instagram.com/${instagram.replace("@", "")}`} icon={<Instagram size={14} />} label="Instagram" color="#DB2777" />}
                <button onClick={downloadText} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:-translate-y-0.5">
                  <Download size={14} /> Download CV
                </button>
              </div>
            </div>
          </motion.div>

          <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 text-sm text-slate-600 shadow-soft backdrop-blur lg:max-w-xs">
            <p className="font-bold text-slate-900">Contact</p>
            <p className="mt-2">{profile.email}</p>
            <p>{profile.alternateEmail}</p>
            <p>{profile.phone}</p>
            <p>{profile.location}</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-3 px-5 pb-7 md:grid-cols-4 md:px-10">
          {[
            ["3", "Research Papers", "#2563EB"],
            ["6", "Financial Models", "#D97706"],
            ["35", "Months Experience", "#16A34A"],
            ["500+", "Students Mentored", "#DC2626"],
          ].map(([value, label, color]) => (
            <div key={label} className="rounded-2xl border bg-white/90 p-4 shadow-sm backdrop-blur" style={{ borderColor: `${color}22` }}>
              <strong className="block text-2xl font-black" style={{ color }}>{value}</strong>
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 md:px-10">
          <div className="portfolio-tabs-grid">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = pathname === tab.href || (pathname === "/" && tab.href === "/about");
              return (
                <Link
                  key={tab.href + tab.label}
                  href={tab.href}
                  className="group relative overflow-hidden rounded-2xl border p-3 text-left transition duration-200 hover:-translate-y-1 hover:shadow-lift"
                  style={
                    {
                      color: active ? "#ffffff" : tab.accent,
                      background: active
                        ? `linear-gradient(135deg, ${tab.accent}, ${shade(tab.accent, -26)})`
                        : `linear-gradient(135deg, ${withAlpha(tab.accent, 0.12)}, #ffffff)`,
                      borderColor: active ? "transparent" : withAlpha(tab.accent, 0.22),
                      "--tab-accent": tab.accent,
                    } as CSSProperties
                  }
                >
                  <span className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/20 transition group-hover:scale-125" />
                  <span className="relative flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm" style={{ color: tab.accent }}>
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0">
                      <strong className="block text-sm font-black leading-tight">{tab.label}</strong>
                      <small className={`mt-1 block text-[11px] font-bold leading-tight ${active ? "text-white/75" : "text-slate-500"}`}>{tab.desc}</small>
                    </span>
                  </span>
                  {active && <motion.span layoutId="tab-glow" className="absolute inset-x-4 bottom-0 h-1 rounded-t-full bg-white/80" />}
                </Link>
              );
            })}
          </div>

          <div className="flex w-fit rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => router.push("/about")}
              className={`rounded-lg px-3 py-2 text-xs font-black ${mode === "professional" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
            >
              Professional
            </button>
            <button
              onClick={() => router.push("/blog")}
              className={`rounded-lg px-3 py-2 text-xs font-black ${mode === "creative" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"}`}
            >
              Blog / Writing
            </button>
          </div>
        </div>
      </div>

      <motion.section
        key={pathname}
        className="mx-auto max-w-7xl px-5 py-8 md:px-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div
          className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft md:p-6"
          style={collegeImage ? ({ "--college-image": `url(${collegeImage})` } as CSSProperties) : undefined}
        >
          {children}
        </div>
      </motion.section>

      {drawerOpen && <button aria-label="Close drawer" className="fixed inset-0 z-40 bg-slate-950/45" onClick={() => setDrawerOpen(false)} />}
      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-[min(92vw,430px)] flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">Portfolio Manager</p>
            <h2 className="mt-1 text-xl font-black">{profile.name}</h2>
          </div>
          <button className="rounded-lg bg-white/10 p-2" onClick={() => setDrawerOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          <DrawerGroup title="Profile Editor">
            <label className="drawer-action">
              <ImagePlus size={18} /> Upload Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
            <label className="drawer-action">
              <ImagePlus size={18} /> Upload College Photo
              <input type="file" accept="image/*" className="hidden" onChange={handleCollegeImage} />
            </label>
            <label className="drawer-action">
              <FileText size={18} /> Upload CV / Resume {cvName && <small>{cvName}</small>}
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCv} />
            </label>
            <label className="grid gap-2 text-sm font-bold text-white/75">
              Instagram Handle
              <input value={instagram} onChange={(event) => setInstagram(event.target.value)} className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none" placeholder="@handle" />
            </label>
          </DrawerGroup>

          <DrawerGroup title="Gemini Resume Rewriter">
            <textarea
              value={resumeInput}
              onChange={(event) => setResumeInput(event.target.value)}
              className="min-h-32 rounded-xl border border-white/10 bg-white/10 p-3 text-sm leading-7 text-white outline-none placeholder:text-white/35"
              placeholder="Paste raw experience, bullet points, or CV text here. Gemini will rewrite it into finance-recruiter-grade bullets."
            />
            <button onClick={rewriteResume} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-black transition hover:bg-indigo-400">
              <Sparkles size={16} /> {rewriteLoading ? "Rewriting..." : "Rewrite with Gemini 2.5 Flash"}
            </button>
            {rewriteOutput && (
              <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                <div className="mb-2 flex justify-end gap-2">
                  <button onClick={() => navigator.clipboard?.writeText(rewriteOutput)} className="rounded-lg bg-white/10 p-2">
                    <Copy size={14} />
                  </button>
                  <button onClick={downloadText} className="rounded-lg bg-white/10 p-2">
                    <Download size={14} />
                  </button>
                </div>
                <pre className="max-h-60 whitespace-pre-wrap text-xs leading-6 text-white/80">{rewriteOutput}</pre>
              </div>
            )}
          </DrawerGroup>

          <DrawerGroup title="Upload My Documents">
            <label className="drawer-action">
              <Upload size={18} /> Upload Research Papers / Models / Certificates
              <input type="file" multiple className="hidden" onChange={handleDocuments} />
            </label>
            {documentNames.map((name) => (
              <span key={name} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/70">
                <FileSpreadsheet size={13} /> {name}
              </span>
            ))}
          </DrawerGroup>

          <DrawerGroup title="Quick Navigation">
            {[...professionalTabs, { href: "/blog", label: "Blog / Creative Mode", icon: PenLine, accent: accents.blog }].map((item) => (
              <Link key={item.href} className="drawer-action" href={item.href} onClick={() => setDrawerOpen(false)}>
                <item.icon size={18} /> {item.label}
              </Link>
            ))}
          </DrawerGroup>
        </div>
      </aside>
    </main>
  );
}

function Social({ href, icon, label, color }: { href: string; icon: ReactNode; label: string; color: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition hover:-translate-y-0.5"
      style={{ color, background: `${color}10`, borderColor: `${color}22` }}
    >
      {icon} {label}
    </a>
  );
}

function DrawerGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid gap-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/30">{title}</p>
      {children}
    </div>
  );
}

function withAlpha(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function shade(hex: string, percent: number) {
  const clean = hex.replace("#", "");
  const amount = Math.round(2.55 * percent);
  const r = Math.max(0, Math.min(255, parseInt(clean.slice(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(clean.slice(2, 4), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(clean.slice(4, 6), 16) + amount));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
