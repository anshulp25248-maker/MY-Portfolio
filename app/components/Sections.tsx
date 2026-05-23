"use client";

import { Award, BookOpen, ChevronDown, ExternalLink, FileText, GraduationCap, Plus, Quote, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { about, college, experience, projects, vision, works, blog } from "../data/portfolioContent";

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <div className="space-y-8">
      <SectionHero eyebrow="About Me" title={about.heading} body={about.opening} accent="#2563EB" />
      <div className="grid gap-4 md:grid-cols-4">
        {about.stats.map(([label, value], index) => (
          <motion.article key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft" {...fade} transition={{ delay: index * 0.03 }}>
            <strong className="block text-4xl font-black text-slate-950">{value}</strong>
            <span className="mt-2 block text-sm leading-6 text-slate-500">{label}</span>
          </motion.article>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h3 className="mb-5 flex items-center gap-2 text-xl font-black"><Award className="text-blue-600" /> Certifications</h3>
          <div className="grid gap-3">
            {about.certifications.map(([name, year, body]) => (
              <div key={name} className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-black text-slate-950">{name}</p>
                    <p className="mt-1 text-sm text-slate-500">{body}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{year}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-5 text-xl font-black">Personal Interests</h3>
          <div className="flex flex-wrap gap-2">
            {about.interests.map((interest) => (
              <span key={interest} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">{interest}</span>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <h3 className="mb-6 text-xl font-black">Skills & Capability Map</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(about.skills).map(([group, skills]) => (
            <div key={group}>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.12em] text-blue-600">{group}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function Experience() {
  return (
    <div className="space-y-8">
      <SectionHero eyebrow="My Experience" title={experience.heading} body="A detailed record of investment research, Green Flow Ventures strategic work, municipal operations leadership, and voluntary teaching." accent="#16A34A" />
      <div className="space-y-5">
        {experience.roles.map((role, index) => (
          <motion.article key={role.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lift" {...fade} transition={{ delay: index * 0.05 }}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700">{role.type}</span>
                <h2 className="mt-3 text-2xl font-black text-slate-950">{role.title}</h2>
                <p className="font-bold text-green-700">{role.company}</p>
              </div>
              <span className="rounded-full border border-slate-200 px-3 py-2 text-xs font-black text-slate-500">{role.period}</span>
            </div>
            <p className="text-justify text-sm leading-8 text-slate-600">{role.description}</p>
            <ul className="mt-5 grid gap-3">
              {role.bullets.map((bullet) => <li key={bullet} className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{bullet}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export function College() {
  return (
    <div className="space-y-8">
      <SectionHero eyebrow="My College" title={college.heading} body={college.description} accent="#7C3AED" />
      <Card>
        <h3 className="mb-5 flex items-center gap-2 text-xl font-black"><GraduationCap className="text-violet-600" /> Key Activities at IIM Trichy</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {college.activities.map((activity) => <div key={activity} className="rounded-2xl bg-violet-50 p-4 text-sm leading-7 text-slate-700">{activity}</div>)}
        </div>
      </Card>
      <Card>
        <h3 className="mb-5 text-xl font-black">Academic Timeline</h3>
        <div className="grid gap-3">
          {college.timeline.map(([degree, institution, score, year]) => (
            <div key={degree} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_1.4fr_0.6fr_0.5fr]">
              <strong>{degree}</strong>
              <span className="text-slate-600">{institution}</span>
              <span className="font-bold text-violet-700">{score}</span>
              <span className="text-slate-500">{year}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function Works() {
  const [open, setOpen] = useState<string | null>(works.papers[0]?.title ?? null);
  return (
    <div className="space-y-8">
      <SectionHero eyebrow="My Works" title={works.heading} body="Research papers, financial models, and published media built from uploaded CVs, research files, and Excel models." accent="#D97706" />
      <div>
        <SubTitle icon={<FileText />} title="Research Papers & White Papers" />
        <div className="grid gap-5">
          {works.papers.map((paper) => {
            const expanded = open === paper.title;
            return (
              <article key={paper.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <button className="flex w-full items-start justify-between gap-4 text-left" onClick={() => setOpen(expanded ? null : paper.title)}>
                  <div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">{paper.year}</span>
                    <h3 className="mt-3 text-xl font-black text-slate-950">{paper.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{paper.authors}</p>
                  </div>
                  <ChevronDown className={`mt-2 text-amber-600 transition ${expanded ? "rotate-180" : ""}`} />
                </button>
                <p className="mt-4 text-justify text-sm leading-8 text-slate-600">{paper.summary}</p>
                {expanded && (
                  <motion.div className="mt-5 space-y-3" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    {paper.findings.map((finding) => <div key={finding} className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{finding}</div>)}
                  </motion.div>
                )}
                <div className="mt-5 flex flex-wrap gap-2">{paper.tags.map((tag) => <span key={tag} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{tag}</span>)}</div>
              </article>
            );
          })}
        </div>
      </div>
      <div>
        <SubTitle icon={<TrendingUp />} title="Financial Models" />
        <GridItems items={works.models} accent="amber" />
      </div>
      <div>
        <SubTitle icon={<BookOpen />} title="Published Articles & Media" />
        <GridItems items={works.articles} accent="amber" />
      </div>
    </div>
  );
}

export function Vision() {
  return (
    <div className="space-y-8">
      <SectionHero eyebrow="Vision & Aspirations" title={vision.heading} body={vision.opening} accent="#DC2626" />
      <Card><p className="border-l-4 border-red-600 pl-5 text-justify text-xl font-semibold leading-10 text-slate-800">{vision.statement}</p></Card>
      <Card>
        <h3 className="mb-6 text-xl font-black">5-Year Roadmap</h3>
        <div className="grid gap-4">
          {vision.roadmap.map(([title, body], index) => (
            <div key={title} className="grid gap-4 rounded-2xl bg-red-50 p-5 md:grid-cols-[70px_1fr]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-lg font-black text-white">{index + 1}</span>
              <div><h4 className="font-black text-slate-950">{title}</h4><p className="mt-2 text-sm leading-7 text-slate-600">{body}</p></div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-3">{vision.beliefs.map((belief) => <Card key={belief}><Quote className="mb-4 text-red-600" /><p className="text-lg font-bold leading-8">{belief}</p></Card>)}</div>
      <div className="grid gap-5 md:grid-cols-2">
        <ListCard title="What Drives Me" items={vision.drivers} />
        <ListCard title="Causes I Care About" items={vision.causes} />
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <div className="space-y-8">
      <SectionHero eyebrow="Projects & Apps" title={projects.heading} body="Live products and applications listed separately from the portfolio itself." accent="#0F766E" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.items.map((project) => (
          <Card key={project.title}>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">{project.status}</span>
            <h3 className="mt-4 text-2xl font-black">{project.title}</h3>
            <p className="mt-3 text-justify text-sm leading-8 text-slate-600">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">{project.tech.map((tech) => <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{tech}</span>)}</div>
            <a href={project.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-black text-white"><ExternalLink size={16} /> Open Project</a>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Blog() {
  const [posts, setPosts] = useState<{ title: string; category: string; content: string }[]>([]);
  const [draft, setDraft] = useState({ title: "", category: "Poetry", content: "" });
  const addPost = () => {
    if (!draft.title.trim() || !draft.content.trim()) return;
    setPosts((current) => [draft, ...current]);
    setDraft({ title: "", category: "Poetry", content: "" });
  };
  return (
    <div className="space-y-8">
      <SectionHero eyebrow="Blog / Creative Writing" title={blog.heading} body={blog.intro} accent="#9333EA" />
      <Card>
        <h3 className="mb-5 flex items-center gap-2 text-xl font-black"><Plus className="text-purple-600" /> New Post</h3>
        <div className="grid gap-3">
          <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-400" placeholder="Post title" />
          <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-400">
            {blog.categories.map((category) => <option key={category}>{category}</option>)}
          </select>
          <textarea value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} className="min-h-40 rounded-xl border border-slate-200 px-4 py-3 leading-8 outline-none focus:border-purple-400" placeholder="Write poetry, essay, or market thought here." />
          <button onClick={addPost} className="w-fit rounded-xl bg-purple-600 px-5 py-3 text-sm font-black text-white">Publish locally</button>
        </div>
      </Card>
      <div className="grid gap-5 md:grid-cols-2">
        {posts.length === 0 && <Card><p className="text-slate-500">No posts yet. Use the New Post form to publish your first local writing card.</p></Card>}
        {posts.map((post) => <Card key={post.title}><span className="text-xs font-black uppercase tracking-[0.12em] text-purple-600">{post.category}</span><h3 className="mt-3 text-2xl font-black">{post.title}</h3><p className="mt-3 whitespace-pre-wrap text-sm leading-8 text-slate-600">{post.content}</p></Card>)}
      </div>
    </div>
  );
}

function SectionHero({ eyebrow, title, body, accent }: { eyebrow: string; title: string; body: string; accent: string }) {
  return (
    <motion.div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-soft" {...fade}>
      <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: accent }}>{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-black leading-tight text-slate-950 md:text-6xl">{title}</h2>
      <p className="mt-5 max-w-5xl text-justify text-base leading-9 text-slate-600">{body}</p>
    </motion.div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">{children}</article>;
}

function SubTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <h3 className="mb-4 mt-2 flex items-center gap-2 text-2xl font-black text-slate-950">{icon}{title}</h3>;
}

function GridItems({ items }: { items: string[][]; accent: string }) {
  return <div className="grid gap-5 md:grid-cols-2">{items.map(([name, platform, year, description]) => <Card key={name}><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">{year}</span><h4 className="mt-4 text-xl font-black">{name}</h4><p className="mt-1 text-sm font-bold text-amber-700">{platform}</p><p className="mt-3 text-justify text-sm leading-8 text-slate-600">{description}</p></Card>)}</div>;
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return <Card><h3 className="mb-4 text-xl font-black">{title}</h3><ul className="space-y-3">{items.map((item) => <li key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{item}</li>)}</ul></Card>;
}
