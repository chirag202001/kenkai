import { Rocket, Clock, ShieldCheck, Workflow } from "lucide-react";

const items = [
  { icon: Rocket, text: "Founder-led execution" },
  { icon: Clock, text: "Fast discovery → delivery" },
  { icon: Workflow, text: "Structured, measurable process" },
  { icon: ShieldCheck, text: "Quality and resilience by design" },
];

const StrengthsStrip = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-purple-50 border-y border-blue-100" aria-label="Kenkai strengths">
      <div className="container-width px-4 md:px-8 py-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 bg-white/70 backdrop-blur rounded-xl border border-gray-200 px-4 py-3">
              <Icon className="w-5 h-5 text-blue-700" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-800">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StrengthsStrip;
