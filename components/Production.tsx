import Shot from "./Shot";
import { shots } from "@/lib/content";

export default function Production() {
  return (
    <section
      className="wrap"
      style={{ paddingTop: "clamp(18px,2.4vw,36px)", paddingBottom: "clamp(18px,2.4vw,36px)" }}
    >
      <div className="rv">
        <Shot
          {...shots.production}
          ratio="21/9"
          caption={["Fig. 01 / Production", "Wet processing"]}
          sizes="100vw"
          priority
        />
      </div>
    </section>
  );
}
