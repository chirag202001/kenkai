import { Code, Rocket, ShieldCheck, Sparkles, Timer, Workflow } from "lucide-react";

const StrengthsSection = () => {
  const strengths = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "Hands-On Founders",
      desc: "Both founders execute directly—no junior handoff, ensuring senior decision-making in architecture, delivery, and problem framing.",
    },
    {
      icon: <Timer className="w-8 h-8 text-blue-600" />,
      title: "Fast Discovery → Delivery",
      desc: "We compress weeks of ambiguity into days with structured discovery, rapid wireframes, and technical validation.",
    },
    {
      icon: <Workflow className="w-8 h-8 text-blue-600" />,
      title: "Battle-Tested Process",
      desc: "Lean, instrumented delivery loops with measurable checkpoints and explicit acceptance gates.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Quality & Resilience",
      desc: "Architecture decisions documented, testing pyramid applied, and future maintainers considered from day one.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: "Pragmatic Innovation",
      desc: "We leverage AI & automation where it compounds outcome—not where it adds novelty risk.",
    },
    {
      icon: <Code className="w-8 h-8 text-blue-600" />,
      title: "Full-Stack Depth",
      desc: "From product scoping to infra hardening: frontend DX, backend scalability, data, observability, and CICD.",
    },
  ];

  const capabilityGroups = [
    {
      label: "Product & Discovery",
      items: ["Problem Framing", "Requirements Clarification", "User Flow Mapping", "Wireframes", "Prioritization"],
    },
    {
      label: "Architecture & Backend",
      items: ["Domain Modeling", "API & GraphQL Design", "Async Messaging", "Caching Strategies", "Auth & RBAC"],
    },
    {
      label: "Frontend & UX",
      items: ["Next.js & React Patterns", "Component Systems", "State Modeling", "Performance Budgets", "A11y Semantics"],
    },
    {
      label: "Data & Intelligence",
      items: ["ETL & Pipelines", "Analytics Instrumentation", "Event Modeling", "LLM Integration", "Data Quality"],
    },
    {
      label: "DevOps & Reliability",
      items: ["CI/CD Automation", "IaC Baselines", "Observability (Logs/Metrics/Traces)", "Scalability Planning", "Resilience Testing"],
    },
    {
      label: "Delivery & Governance",
      items: ["Incremental Roadmaps", "Story Shaping", "Risk Surfacing", "Technical Debt Ledger", "Runbooks"],
    },
  ];

  const deliveryModel = [
    { t: "Structured Discovery Sprint", d: "Clarify scope, risks, success metrics" },
    { t: "Architecture Blueprint", d: "Decisions, tradeoffs, component boundaries" },
    { t: "Execution Waves", d: "Short, reviewable increments with demo cadence" },
    { t: "Instrumentation & QA", d: "Logging, metrics, tests, performance budgets" },
    { t: "Transition & Enablement", d: "Runbooks, onboarding docs, handover checklist" },
  ];

  const stack = [
    "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis", "Supabase", "Kafka", "Docker", "Kubernetes", "AWS", "Vercel", "Playwright", "Jest", "Airflow", "Stripe", "LangChain", "OpenAI" 
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="strengths-heading">
      <div className="container-width px-4 md:px-8">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 id="strengths-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Why Early Clients Choose Us
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We intentionally stayed lean: both founders build side‑by‑side with you. Instead of a layered org, you get direct access, faster iteration, and senior rigor from day one.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
            🚀 Founder-Led • Zero Bureaucracy • High Velocity
          </div>
        </div>

        {/* Strength Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {strengths.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Capability Matrix */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Core Capability Lanes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilityGroups.map((group, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                  {group.label}
                </h4>
                <ul className="space-y-2 text-sm">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-3"></span>
                      <span className="text-gray-600 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Model */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Delivery Model</h3>
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6">
            {deliveryModel.map(step => (
              <div key={step.t} className="bg-white rounded-xl p-5 border border-gray-100 relative">
                <div className="text-sm font-semibold text-blue-600 mb-1">{step.t}</div>
                <p className="text-xs text-gray-600 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tooling Stack */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">Practical Stack Coverage</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {stack.map(tool => (
              <span key={tool} className="text-xs font-medium px-3 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:border-blue-400 hover:text-blue-700 transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-10 md:p-14 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Work Directly With the Builders</h3>
          <p className="text-base md:text-lg text-blue-50 max-w-2xl mx-auto mb-8">
            No layers of account management. We scope, architect, build, and ship with you—while transferring process and technical clarity to your internal team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sprint-request"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl text-sm hover:bg-blue-50 transition"
            >
              Start Discovery
            </a>
            <a
              href="/book-call"
              className="bg-transparent border border-white/70 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white hover:text-blue-700 transition"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrengthsSection;
