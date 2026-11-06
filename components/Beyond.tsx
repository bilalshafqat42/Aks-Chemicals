import { otherMarkets } from "@/lib/content";

export default function Beyond() {
  return (
    <section className="sec wrap" style={{ paddingTop: 0 }}>
      <div className="shead">
        <span className="no">03</span>
        <h2 className="rv">Beyond textiles</h2>
      </div>
      <div className="cards">
        {otherMarkets.map((m, i) => (
          <article className="rv" data-d={i === 0 ? undefined : String(i)} key={m.k}>
            <span className="k">{m.k}</span>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
