import Shot from "./Shot";
import { ranges, shots } from "@/lib/content";

function Arrow() {
  return (
    <span className="go">
      <svg viewBox="0 0 12 12" aria-hidden="true">
        <path d="M1 11L11 1M4 1h7v7" />
      </svg>
    </span>
  );
}

export default function Ranges() {
  return (
    <section
      className="sec wrap paper"
      id="ranges"
      style={{ paddingTop: "clamp(72px,10vw,170px)" }}
    >
      <div className="shead">
        <span className="no">02</span>
        <h2 className="rv">What we do</h2>
      </div>

      <div className="rng">
        {ranges.map((r, i) => (
          <a href="#contact" className="rv" data-d={i === 0 ? undefined : String(i)} key={r.n}>
            <span className="n">{r.n}</span>
            <h3>{r.name}</h3>
            <span className="de">{r.blurb}</span>
            <Arrow />
          </a>
        ))}
      </div>

      <div className="grid ae" style={{ marginTop: "clamp(40px,5vw,78px)" }}>
        <div className="rv c7">
          <Shot
            {...shots.finishing}
            ratio="16/11"
            caption={["Fig. 03 / Finishing", "16:11"]}
            sizes="(max-width: 860px) 100vw, 58vw"
          />
        </div>
        <div className="rv c4r" data-d="1">
          <Shot
            {...shots.plant}
            ratio="4/5"
            caption={["Fig. 04 / Plant", "4:5"]}
            sizes="(max-width: 860px) 100vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
}
