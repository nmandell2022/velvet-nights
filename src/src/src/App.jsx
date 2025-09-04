import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Music3, Martini, ShieldCheck, Moon, Mail, Instagram, CalendarDays, Sparkles, MapPin } from "lucide-react";

const bgImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481068164146-e8beb686f4d2?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2100&auto=format&fit=crop"
];

function useInterval(callback, delay) {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

const AgeGate = ({ onEnter }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-[92%] rounded-2xl p-8 text-center border border-white/10 bg-gradient-to-b from-neutral-900 to-black shadow-2xl">
      <div className="mx-auto mb-6 h-14 w-14 grid place-content-center rounded-full bg-rose-900/40 ring-1 ring-rose-500/30">
        <Moon className="h-7 w-7 text-rose-300" />
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white">Velvet Nights</h2>
      <p className="mt-2 text-neutral-300">A private jazz & cocktail experience. You must be 21+ to enter.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={onEnter} className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-900/30 transition">I am 21+</button>
        <a href="https://www.responsibility.org/" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl border border-white/15 text-neutral-200 hover:bg-white/5 transition">Learn more</a>
      </div>
      <p className="mt-4 text-xs text-neutral-400">By entering, you agree to our House Rules & Code of Conduct.</p>
    </motion.div>
  </div>
);

const FeatureCard = ({ icon, title, copy }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} className="rounded-2xl p-6 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition shadow-lg">
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-900/30 ring-1 ring-rose-700/30">{icon}</div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{copy}</p>
  </motion.div>
);

const Input = (props) => (
  <input {...props} className={`w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500 ${props.className || ""}`} />
);

const TextArea = (props) => (
  <textarea {...props} className={`w-full min-h-[120px] rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500 ${props.className || ""}`} />
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="mt-2 text-neutral-300 max-w-3xl">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

export default function VelvetNights() {
  const [entered, setEntered] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useInterval(() => setBgIndex((i) => (i + 1) % bgImages.length), 8000);

  useEffect(() => {
    document.title = "Velvet Nights";
    const ok = localStorage.getItem("velvet_age_ok");
    if (ok === "true") setEntered(true);
  }, []);

  const onEnter = () => { localStorage.setItem("velvet_age_ok", "true"); setEntered(true); };

  const [form, setForm] = useState({
    name: "", email: "", phone: "", partySize: "2", preferredNight: "",
    seating: "Table", heardFrom: "", styleNotes: "", message: "", acceptRules: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.acceptRules) { alert("Please confirm you agree to the House Rules."); return; }
    const payload = { ...form, submittedAt: new Date().toISOString() };
    localStorage.setItem("velvet_guest_request", JSON.stringify(payload));
    alert("You're on the list. We'll be in touch soon ✨");
    setForm({ name: "", email: "", phone: "", partySize: "2", preferredNight: "", seating: "Table", heardFrom: "", styleNotes: "", message: "", acceptRules: false });
  };

  const bgStyle = useMemo(() => ({ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(${bgImages[bgIndex]})` }), [bgIndex]);

  return (
    <div className="min-h-screen text-neutral-100" style={{ backgroundColor: "#0b0b0b" }}>
      {!entered && <AgeGate onEnter={onEnter} />}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="h-8 w-8 grid place-content-center rounded-lg bg-rose-900/50 ring-1 ring-rose-700/40"><Sparkles className="h-4 w-4 text-rose-300" /></div>
            <span className="font-semibold tracking-wide">Velvet Nights</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-white/90 text-neutral-300">About</a>
            <a href="#experience" className="hover:text-white/90 text-neutral-300">Experience</a>
            <a href="#events" className="hover:text-white/90 text-neutral-300">Events</a>
            <a href="#gallery" className="hover:text-white/90 text-neutral-300">Gallery</a>
            <a href="#rsvp" className="hover:text-white/90 text-neutral-300">Guest List</a>
            <a href="#contact" className="hover:text-white/90 text-neutral-300">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#rsvp" className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium shadow">Join the List</a>
          </div>
        </nav>
      </header>

      <section id="home" className="relative">
        <div className="relative h-[78vh] w-full bg-cover bg-center transition-[background-image] duration-[2000ms]" style={bgStyle}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
          <div className="relative z-10 mx-auto max-w-6xl px-6 h-full flex items-center">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-semibold tracking-tight text-white">Velvet Nights</motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-4 max-w-xl text-neutral-200 text-lg">A clandestine jazz & cocktail lounge—elegant, intimate, and unapologetically classy. Dress to enchant.</motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#rsvp" className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-900/30">Request Invitation</a>
                <a href="#events" className="px-6 py-3 rounded-xl border border-white/15 text-white hover:bg-white/5">Upcoming Soirées</a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Section id="about" title="An Evening Draped in Velvet" subtitle="Velvet Nights is not a strip club. It’s an ode to live jazz, candlelit ambiance, refined cocktails, and the timeless allure of feminine energy—celebrated with respect and class.">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard icon={<Music3 className="h-6 w-6 text-rose-300" />} title="Live Jazz & Soul" copy="Curated sets from rotating artists set the tone—smoky, sultry, and smooth." />
          <FeatureCard icon={<Martini className="h-6 w-6 text-rose-300" />} title="Cocktails, Reimagined" copy="Classic standards meet modern craft. Zero-proof offerings crafted with the same attention." />
          <FeatureCard icon={<ShieldCheck className="h-6 w-6 text-rose-300" />} title="Respect & Consent" copy="Our House Rules protect the vibe. Discretion, dress, and mutual respect are non-negotiable." />
        </div>
      </Section>

      <Section id="experience" title="House Rules & Dress Code" subtitle="We curate a space that feels rare—private, refined, and safe for everyone.">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">House Rules</h3>
              <ul className="mt-3 space-y-2 text-neutral-300 text-sm list-disc list-inside">
                <li>21+ with valid ID. Respect staff & guests.</li>
                <li>Photography by permission only. Discretion is our default.</li>
                <li>No solicitation. No explicit conduct on premises.</li>
                <li>Consent is paramount—verbal, enthusiastic, and continuous.</li>
                <li>Management reserves the right to refuse entry/service.</li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">Dress Code</h3>
              <p className="mt-3 text-neutral-300 text-sm">
                Black, velvet, satin, silk, and gold accents encouraged. Think chic cocktail, tux-inspired, elevated evening wear. Sneakers, ball caps, and casual athleisure are not permitted.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="events" title="Upcoming Soirées" subtitle="Limited-capacity reservations. Private hostings available upon request.">
        <div className="grid md:grid-cols-2 gap-6">
          {[1,2].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
              <div className="aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: `url(${bgImages[(bgIndex + i) % bgImages.length]})` }} />
              <div className="p-6">
                <div className="flex items-center gap-2 text-rose-300 text-sm"><CalendarDays className="h-4 w-4" /> Date TBA • Detroit Area</div>
                <h3 className="mt-2 text-xl font-semibold text-white">Velvet Nights {i === 1 ? "Soirée" : "After-Hours"}</h3>
                <p className="mt-2 text-neutral-300 text-sm">An intimate evening of live jazz, candlelight, and handcrafted cocktails. Invitations prioritized for the Guest List.</p>
                <div className="mt-4 flex items-center gap-3">
                  <a href="#rsvp" className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium">Request Invite</a>
                  <button className="px-4 py-2 rounded-xl border border-white/15 text-white text-sm hover:bg-white/5">Private Booking</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="gallery" title="A Glimpse of the Mood">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {bgImages.concat(bgImages.slice(0,3)).map((src, idx) => (
            <motion.div key={idx}
