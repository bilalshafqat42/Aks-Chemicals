import { figures } from "@/lib/content";

export default function Figures() {
  return (
    <section className="figwrap">
      <div className="figs">
        {figures.map((f) => (
          <div key={f.value}>
            <b>{f.value}</b>
            <span>
              {f.label[0]}
              <br />
              {f.label[1]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
