import { standards } from "@/lib/content";

export default function Standards() {
  return (
    <section className="sec wrap paper" id="compliance">
      <div className="shead">
        <span className="no">05</span>
        <h2 className="rv">Standards</h2>
      </div>
      <div className="comp">
        {standards.map((s, i) => (
          <div className="rv" data-d={i === 0 ? undefined : String(i)} key={s.title}>
            <span className="k">{s.k}</span>
            <b>{s.title}</b>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
