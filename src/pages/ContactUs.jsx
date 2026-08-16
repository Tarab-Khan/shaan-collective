import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/hero.png";
import { GoldFlower, GoldSparkle, GoldSparkleCluster } from "../components/GoldDecorations";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Bridal Couture Consultation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#070605] text-[#e8dbbf]">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#070605] px-8 pb-24 pt-40 text-center border-b border-[#dfba6a]/20">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={heroImage}
            alt="The Shaan Collective Contact"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#070605]/90 via-[#070605]/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#070605]/70 via-transparent to-transparent" />
        </div>

        {/* AMBIENT GOLDEN SPARKLES */}
        <GoldSparkleCluster className="z-10" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <p className="text-[11px] tracking-[0.45em] text-[#fae39d]">
              CONCIERGE & APPOINTMENTS
            </p>
            <GoldSparkle size={12} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-[0.06em] text-[#fae39d] drop-shadow-[0_0_20px_rgba(250,227,157,0.3)]">
            CONTACT US
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3">
            <GoldFlower size={12} />
            <div className="h-px w-24 bg-linear-to-r from-[#fae39d] to-[#dfba6a]" />
            <GoldFlower size={12} />
          </div>

          <p className="mx-auto mt-6 max-w-2xl font-serif text-sm sm:text-base italic leading-7 text-[#e8dbbf]/90">
            Our royal styling concierge is at your service for bespoke bridal consultations, custom tailoring, and private atelier visits.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="px-6 py-20 md:px-12 bg-[#070605]">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-2">
          {/* LEFT: CONTACT DETAILS */}
          <div>
            <div className="flex items-center gap-3">
              <GoldFlower size={16} />
              <span className="text-xs tracking-[0.3em] text-[#dfba6a]">ATELIER & BOUTIQUE</span>
            </div>
            <h2 className="mt-4 font-serif text-3xl text-[#fae39d] md:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-xs leading-7 tracking-wider text-[#c4b28f]">
              We welcome private bridal appointments and made-to-measure inquiries globally.
            </p>

            <div className="mt-10 space-y-8">
              <div className="border border-[#dfba6a]/20 bg-[#0e0c0a] p-6">
                <p className="text-[10px] tracking-[0.3em] text-[#dfba6a]">FLAGSHIP ATELIER</p>
                <p className="mt-2 font-serif text-lg text-[#fae39d]">The Shaan Collective Maison</p>
                <p className="mt-1 text-xs text-[#a8997a] leading-6">
                  42 Heritage Boulevard, Hazratganj, Lucknow, UP 226001, India
                </p>
              </div>

              <div className="border border-[#dfba6a]/20 bg-[#0e0c0a] p-6">
                <p className="text-[10px] tracking-[0.3em] text-[#dfba6a]">DIRECT CONCIERGE</p>
                <div className="mt-2 space-y-1 text-xs text-[#e8dbbf]">
                  <p><span className="text-[#a8997a]">Email:</span> concierge@shaan-collective.com</p>
                  <p><span className="text-[#a8997a]">Phone:</span> +91 (0) 522 489 9000</p>
                  <p><span className="text-[#a8997a]">WhatsApp:</span> +91 98765 43210 (24/7 Styling Concierge)</p>
                </div>
              </div>

              <div className="border border-[#dfba6a]/20 bg-[#0e0c0a] p-6">
                <p className="text-[10px] tracking-[0.3em] text-[#dfba6a]">HOURS OF APPOINTMENT</p>
                <p className="mt-2 text-xs text-[#e8dbbf] leading-6">
                  Monday – Saturday: 10:30 AM – 7:30 PM IST<br />
                  Sunday: By Private Prior Appointment Only
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: INQUIRY FORM */}
          <div className="border border-[#dfba6a]/30 bg-[#0c0a08] p-8 md:p-10">
            <h3 className="font-serif text-2xl text-[#fae39d]">Send an Inquiry</h3>
            <p className="mt-2 text-xs text-[#a8997a] tracking-wider">
              Fill in your details below and our head stylist will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="mt-10 border border-[#dfba6a]/40 bg-[#120f0c] p-8 text-center">
                <p className="text-3xl text-[#fae39d]">✦</p>
                <h4 className="mt-4 font-serif text-2xl text-[#fae39d]">Thank You</h4>
                <p className="mt-2 text-xs leading-6 text-[#c4b28f]">
                  Your inquiry has been received. A dedicated bridal consultant will connect with you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 border border-[#dfba6a] px-6 py-2.5 text-[10px] tracking-[0.2em] text-[#fae39d] hover:bg-[#dfba6a] hover:text-[#070605] transition"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maharani Zara"
                    className="mt-2 w-full border border-[#dfba6a]/30 bg-[#070605] px-4 py-3 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="zara@example.com"
                      className="mt-2 w-full border border-[#dfba6a]/30 bg-[#070605] px-4 py-3 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="mt-2 w-full border border-[#dfba6a]/30 bg-[#070605] px-4 py-3 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">Inquiry Type</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="mt-2 w-full border border-[#dfba6a]/30 bg-[#070605] px-4 py-3 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
                  >
                    <option value="Bridal Couture Consultation">Bridal Couture Consultation</option>
                    <option value="Men's Bespoke Outerwear">Men's Bespoke Outerwear</option>
                    <option value="Jewellery & Ornaments Styling">Jewellery & Ornaments Styling</option>
                    <option value="Custom Made-to-Measure">Custom Made-to-Measure</option>
                    <option value="Order & Delivery Tracking">Order & Delivery Tracking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-[#dfba6a] uppercase">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your wedding date, occasion, or custom requirements..."
                    className="mt-2 w-full border border-[#dfba6a]/30 bg-[#070605] px-4 py-3 text-xs text-[#fae39d] outline-none focus:border-[#fae39d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border border-[#dfba6a] bg-[#dfba6a] py-4 text-xs font-bold tracking-[0.3em] text-[#070605] hover:bg-[#fae39d] transition mt-4"
                >
                  SUBMIT INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default ContactUs;
