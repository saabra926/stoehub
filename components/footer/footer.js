import Link from "next/link"
export function Footer() {



    return <div>



  <footer className="text-center text-lg-start  text-muted">
    {/* Section: Social media */}
    {/* Section: Social media */}
    {/* Section: Links  */}
    <section className="">
      <div className="container text-center text-md-start mt-5">
        {/* Grid row */}
        <div className="row mt-3">
          {/* Grid column */}
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            {/* Content */}
            <h6 className="text-uppercase text-white fw-bold mb-4">
              <i className="text-white me-3" />
              About Us
            </h6>
            <p className="text-white">
            We provide high-quality shoes for all your needs.
            </p>
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            {/* Links */}
            <h6 className="text-uppercase text-white fw-bold mb-4">quick links</h6>
            <p>
              <a href="https://www.instagram.com/_vibe_with_dawood?igsh=MW5lenhobzZxcHM4Zg==" className="text-white">
                Instagram
              </a>
            </p>
            <p>
              <a href="https://github.com/Dawood0426/weather-app" className="text-white">
                Github
              </a>
            </p>
            <p>
              <a href="https://wa.me/03144885177" target="_blank" className="text-white">
                Whatsapp
              </a>
            </p>
            <p>
              <a href="https://www.facebook.com/itx.rajpootdawood" className="text-white">
                Facebook
              </a>
            </p>
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            {/* Links */}
            <h6 className="text-uppercase text-white fw-bold mb-4">Services</h6>
            <p>
              <Link href="/" className="text-white">
                Home
              </Link>
            </p>
            <p>
              <Link href="/login" className="text-white">
                Login
              </Link>
            </p>
            <p>
              <Link href="/signup" className="text-white">
                Signup
              </Link>
            </p>
            <p>
              <Link href="cart" className="text-white">
               Cart
              </Link>
            </p>
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            {/* Links */}
            <h6 className="text-uppercase text-white fw-bold mb-4">Contact</h6>
            <p className="text-white">
              <i className="text-white  me-3" /> Faisalabad, GM Abad, PK
            </p>
            <p className="text-white">
              <i className="fas fa-envelope me-3" />
              rdawood379@gmail.com
            </p>
            <p className="text-white">
              <i className="fas fa-phone me-3" /> +92 314 4885177
            </p>
            <p className="text-white">
              <i className="fas fa-print me-3" /> +92 314 4885177
            </p>
          </div>
          {/* Grid column */}
        </div>
        {/* Grid row */}
      </div>
    </section>
    {/* Section: Links  */}
    {/* Copyright */}
    <div
      className="text-center text-white p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
      © 2025 Copyright:
      <a href="https://wa.me/03144885177" target="_blank">
         Dawood Rehman
      </a>
    </div>
    {/* Copyright */}
  </footer>

        </div>


}