import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6"
export default function Footer(){
  return(
    <footer className="bg-black text-gray-400 py-6 border-t border-white/10">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-sm">

        <div>
          <h2 className="text-white font-bold text-lg">DevSpectra</h2>
          <p>Building modern digital experiences.</p>
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Services</p>
          <p>Web Development</p>
          <p>UI/UX Design</p>
        </div>

        <div className="flex gap-4 mt-4 text-lg">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
  Facebook
</a>

<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
  Instagram
</a>

<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
  Twitter
</a>
</div>

      </div>

      <p className="text-center mt-6 text-xs">
        © 2026 DevSpectra
      </p>

    </footer>
  )
}
