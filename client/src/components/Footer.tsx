const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <ul className="footer__item">
            <h2>Categories</h2>
            <li>Graphics & Design</li>
            <li>Digital Marketing</li>
            <li>Writing & Translation</li>
            <li>Video & Animation</li>
            <li>Music & Audio</li>
            <li>Programming & Tech</li>
            <li>Data</li>
            <li>Business</li>
            <li>Lifestyle</li>
            <li>Photography</li>
            <li>Sitemap</li>
          </ul>
          <ul className="footer__item">
            <h2>About</h2>
            <li>Press & News</li>
            <li>Partnerships</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Intellectual Property Claims</li>
            <li>Investor Relations</li>
            <li>Contact Sales</li>
          </ul>
          <ul className="footer__item">
            <h2>Support</h2>
            <li>Help & Support</li>
            <li>Trust & Safety</li>
            <li>Selling on Fiverr</li>
            <li>Buying on Fiverr</li>
          </ul>
          <ul className="footer__item">
            <h2>Community</h2>
            <li>Customer Success Stories</li>
            <li>Community hub</li>
            <li>Forum</li>
            <li>Events</li>
            <li>Blog</li>
            <li>Influencers</li>
            <li>Affiliates</li>
            <li>Podcast</li>
            <li>Invite a Friend</li>
            <li>Become a Seller</li>
            <li>Community Standards</li>
          </ul>
          <ul className="footer__item">
            <h2>More From Fiverr</h2>
            <li>Fiverr Business</li>
            <li>Fiverr Pro</li>
            <li>Fiverr Logo Maker</li>
            <li>Fiverr Guides</li>
            <li>Get Inspired</li>
            <li>Fiverr Select</li>
            <li>ClearVoice</li>
            <li>Fiverr Workspace</li>
            <li>Learn</li>
            <li>Working Not Working</li>
          </ul>
        </div>
        <hr />
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <h2>fiverr</h2>
            <span>© Fiverr International Ltd. {new Date().getFullYear()}</span>
          </div>
          <div className="footer__bottom-right">
            <div className="footer__bottom-social">
              <img src="/img/twitter.webp" alt="" />
              <img src="/img/facebook.webp" alt="" />
              <img src="/img/linkedin.webp" alt="" />
              <img src="/img/pinterest.webp" alt="" />
              <img src="/img/instagram.webp" alt="" />
            </div>
            <div className="footer__bottom-link">
              <img src="/img/language.webp" alt="" />
              <span>English</span>
            </div>
            <div className="footer__bottom-link">
              <img src="/img/coin.webp" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.webp" alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
