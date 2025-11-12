const FounderBanner = () => {
  return (
    <section className="bg-blue-50 border-y border-blue-100">
      <div className="container-width px-4 md:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-blue-800 tracking-wide uppercase">Founder-Led Execution</p>
            <h3 className="text-lg md:text-xl font-bold text-blue-900 mt-1">
              You work directly with the builders — no layers, no bureaucracy, just fast iteration.
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <a href="/sprint-request" className="inline-flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold px-4 py-2 text-sm hover:bg-blue-700">
              Start Discovery
            </a>
            <a href="/book-call" className="inline-flex items-center justify-center rounded-lg border border-blue-600 text-blue-700 font-semibold px-4 py-2 text-sm hover:bg-blue-600 hover:text-white">
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderBanner;
