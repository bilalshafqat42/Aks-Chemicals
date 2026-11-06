import ContactForm from "./ContactForm";
import { company } from "@/lib/content";

export default function Contact() {
  return (
    <section className="sec wrap paper" id="contact" style={{ paddingTop: 0 }}>
      <hr className="rule" style={{ marginBottom: "clamp(54px,7vw,110px)" }} />
      <div className="cont">
        <div>
          <div className="shead" style={{ marginBottom: "clamp(20px,2.4vw,34px)" }}>
            <span className="no">06</span>
            <h2 className="rv">Send us the cloth.</h2>
          </div>
          <p className="body rv" data-d="1" style={{ maxWidth: "46ch" }}>
            Tell us the substrate, the process and the result you need. A technician will come back
            to you with a trial recipe.
          </p>

          <dl className="det rv" data-d="2">
            <div>
              <dt>Works &amp; office</dt>
              <dd>
                {company.address[0]}
                <br />
                {company.address[1]}
              </dd>
            </div>
            <div>
              <dt>Telephone</dt>
              <dd>
                {company.phones.map((p) => (
                  <span key={p}>
                    <a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a>
                    <br />
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Fax</dt>
              <dd>{company.fax}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
