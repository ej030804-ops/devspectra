import Footer from "../components/Footer"
import Hero from "../components/Hero"

export default function Home() {
  return (
    <>
      <div className="pt-20">

        {/* HERO */}
        <Hero />

        {/* WHY CHOOSE */}
        <section className="py-24 bg-gradient-to-br from-black via-purple-900 to-black">
          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Why Choose DevSpectra?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-400">
                  We build and deliver projects quickly.
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Custom Solutions
                </h3>
                <p className="text-gray-400">
                  Every product is tailored to your needs.
                </p>
              </div>

              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Scalable Systems
                </h3>
                <p className="text-gray-400">
                  Built to grow with your business.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />

      </div>
    </>
  )
}
