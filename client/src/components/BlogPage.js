import React from 'react';
import './BlogPage.css';

const sections = [
    {
      title: "Fees and Payments",
      content: "Using Zyrix requires careful planning, financial responsibility, and an understanding of the risks involved in cryptocurrency trading. By using this platform, you agree to comply with all applicable laws and regulations regarding payments and fees.\n\nAll fees associated with transactions, including trading, deposits, and withdrawals, will be clearly displayed and deducted accordingly. Zyrix reserves the right to update its fee structure at any time, with changes communicated transparently on the website."
    },
    {
      title: "Account Responsibilities",
      content: "When creating an account on Zyrix, you are solely responsible for maintaining the security of your login credentials. Any activity conducted through your account is your responsibility, and you agree to notify us immediately if you suspect unauthorized access.\n\nYou must ensure that your account complies with Zyrix's security guidelines, including enabling two-factor authentication for enhanced security."
    },
    {
      title: "Prohibited Activities",
      content: "Zyrix strictly prohibits illegal or unethical activities, including but not limited to:\n\nMoney laundering.\nFraudulent transactions.\nUnauthorized access to accounts.\nViolation of intellectual property rights.\n\nEngaging in such activities may result in account suspension, reporting to relevant authorities, and legal action."
    },
    {
      title: "Ownership of Digital Assets",
      content: "All digital assets in your Zyrix account remain your property. Zyrix does not claim ownership over your cryptocurrencies but provides a secure platform to facilitate trading and storage.\n\nZyrix is not responsible for losses resulting from price volatility, user errors, or unauthorized access to your account due to negligence."
    }
  ];

const BlogPage = () => {
  return (
    <div className="blog-page">
      <div className="blog-content">
        <h1 className="blog-title">
          Zyrix <span className="blog-highlight">Blog</span>
        </h1>
        
        {/* First Row */}
        <div className="blog-section">
          <div className="sub-section small-width">
            <h2 className="sub-section-title">
              <span className="highlight-word">Secure</span> Transactions
            </h2>
            <p className="sub-section-text">
              Ensure your funds are always protected with cutting-edge encryption and advanced security protocols. Our platform leverages the latest in blockchain technology to create a safe, transparent, and tamper-proof environment for all your transactions. Say goodbye to worries about fraud or data breaches, and trade with complete peace of mind...
            </p>
          </div>
          <div className="sub-section large-width">
            <h2 className="sub-section-title">
              <span className="highlight-word">Real-Time</span> Analytics
            </h2>
            <p className="sub-section-text">
              Cryptocurrency markets are dynamic and constantly changing, making real-time analytics essential for staying ahead. Our platform equips you with cutting-edge tools to monitor market trends, track price movements, and analyze trading volumes as they happen. By providing live data feeds and detailed graphical insights, we enable you to spot emerging opportunities and potential risks in an instant.<br /><br />
              Beyond basic monitoring, our advanced analytics features offer deeper insights into market sentiment, historical data comparisons, and predictive modeling. Whether you're planning your next trade, managing a portfolio, or exploring new investment strategies, these tools empower you to make decisions backed by data, not guesswork.<br /><br />
              Designed for both beginners and seasoned traders, our customizable dashboards and alerts ensure you...
            </p>
          </div>
        </div>
        
        {/* Second Row */}
        <div className="blog-section reverse-order">
          <div className="sub-section large-width1">
            <h2 className="sub-section-title">
              <span className="highlight-word">Decentralized</span> Freedom
            </h2>
            <p className="sub-section-text">
              Imagine a world where your financial decisions are entirely in your hands, free from the control of banks, intermediaries, or centralized authorities. This is the promise of decentralized freedom brought to life through blockchain technology. Our platform provides a seamless way to engage in peer-to-peer transactions, enabling you to send, receive, and invest assets directly with others, without relying on third parties.<br /><br />
              With decentralization, your funds are always under your control, stored securely in digital wallets that only you can access. Transparency is another cornerstone of this freedom. Every transaction is recorded on the blockchain, creating an immutable ledger that fosters trust and eliminates the possibility of manipulation or fraud.<br /><br />
              Beyond security and transparency, decentralization opens up global opportunities. No longer limited by borders or traditional banking hours, you can trade and invest with anyone, anywhere, at any time. Whether you're transferring funds across continents or participating in decentralized finance (DeFi) platforms, the possibilities are endless.<br /><br />
              By removing intermediaries, decentralization also reduces fees, accelerates transaction speeds...
            </p>
          </div>
          <div className="sub-section small-width1">
            <h2 className="sub-section-title">
              <span className="highlight-word">Smarter Investment</span> Tools
            </h2>
            <p className="sub-section-text">
              In the fast-paced and highly volatile world of cryptocurrency, making the right investment decisions can feel overwhelming. That's where smarter investment tools come in, transforming the way you approach trading and portfolio management. Our platform integrates advanced AI and machine learning algorithms to analyze massive amounts of market data, identify trends, and provide actionable insights tailored to your investment goals.<br /><br />
              With our tools, you can access real-time market forecasts based on historical data, sentiment analysis, and pattern recognition...
            </p>
          </div>
        </div>
        <div className="sections-container">
          {sections.map((section, index) => (
            <div key={index} className="section">
              <h2 className="section-title">{section.title}</h2>
              <p className="section-content">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;