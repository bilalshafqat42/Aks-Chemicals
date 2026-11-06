const MARKS = ["Confidential", "Quality driven", "Cost effective", "Contract batches"];

export default function Toll() {
  return (
    <section className="toll" id="toll">
      <div className="wrap tollin">
        <div className="rv">
          <span className="mono" style={{ color: "#9DB4D8" }}>
            04 / Toll manufacturing
          </span>
          <h2 style={{ marginTop: 22 }}>Your formula. Our plant.</h2>
        </div>
        <div className="rv" data-d="1">
          <p>
            AKS offers a cost effective, quality driven and confidential toll manufacturing service.
            You bring the formulation, we bring the vessels, the controls and the people who run them
            every day.
          </p>
          <div className="lst">
            {MARKS.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
