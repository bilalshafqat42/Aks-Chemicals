import Shot from "./Shot";
import { capabilities, company, shots } from "@/lib/content";

export default function About() {
  return (
    <section className="sec wrap" id="about">
      <div className="shead">
        <span className="no">01</span>
        <h2 className="rv">Who we are</h2>
      </div>

      <div className="grid">
        <div className="body rv c7" data-d="1">
          <p className="lead" style={{ color: "var(--bone)", maxWidth: "28ch", marginBottom: 34 }}>
            Established in {company.founded} in the heartland of the Pakistan textile industry.
          </p>
          <p>
            AKS Chemicals has grown to become one of the world leaders in the manufacture and supply
            of textile chemicals. The plant sits where its customers are, which is the whole point: a
            mill can send cloth in the morning and have a trial back the same week.
          </p>
          <p>
            The range covers the wet process end to end. Pretreatment, dyeing auxiliaries, finishes,
            denim washing and the special finishing chemistry that sits on top of it, including water
            repellents, oil repellents and flame retardants.
          </p>

          <ul className="mini">
            {capabilities.map((c) => (
              <li key={c.label}>
                <span>{c.label}</span>
                <b>{c.value}</b>
              </li>
            ))}
          </ul>
        </div>

        <div className="rv c4r" data-d="2">
          <Shot
            {...shots.laboratory}
            ratio="4/5"
            caption={["Fig. 02 / Laboratory", "4:5"]}
            sizes="(max-width: 860px) 100vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
}
