import { company } from "@/lib/content";

const LINES = ["The chemistry", "behind the", "cloth."];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="tag">
        <span className="mono">{company.tagline}</span>
        <span className="mono">{company.city}</span>
      </div>

      <h1>
        {LINES.map((line) => (
          <span className="ln" key={line}>
            <i>{line}</i>
          </span>
        ))}
      </h1>

      <div className="under">
        <p>
          AKS Chemicals has manufactured and supplied textile auxiliaries from Lahore since {company.founded}, in
          the heartland of the Pakistan textile industry. Pretreatment through to finishing, for
          mills at home and abroad.
        </p>
        <div className="scroll">
          <span className="mono">Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}
