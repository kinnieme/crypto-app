import React from 'react';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
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
    },
    {
      title: "Risk Disclosure",
      content: "Trading cryptocurrencies involves high risk due to market volatility and price fluctuations. By using Zyrix, you acknowledge and accept the risks associated with digital asset trading.\n\nZyrix provides educational resources but does not offer financial or investment advice. Users are encouraged to conduct their research before making any trades."
    },
    {
      title: "Content Usage",
      content: "All content, including text, images, and tutorials provided on the Zyrix platform, is the intellectual property of Zyrix unless otherwise stated. You may not reproduce, distribute, or use this content for commercial purposes without prior written consent.\n\nUnauthorized use of content may result in legal action."
    },
    {
      title: "Liability Limitations",
      content: "Zyrix will not be held liable for:\n\nLosses incurred during trades.\nService interruptions caused by technical issues.\nUnauthorized account access due to user negligence.\n\nZyrix strives to maintain high system availability but cannot guarantee uninterrupted access at all times."
    },
    {
      title: "Compliance and Legal Obligations",
      content: "Users of Zyrix are required to comply with applicable laws and regulations in their respective jurisdictions. It is the user's responsibility to ensure that their use of the platform does not violate local laws, including but not limited to:\n\nTax compliance.\nKYC/AML (Know Your Customer/Anti-Money Laundering) regulations.\n\nFailure to comply with these obligations may result in account suspension or termination."
    },
    {
      title: "Modifications to Terms",
      content: "Zyrix reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on the website, and continued use of the platform signifies your acceptance of these updates."
    }
  ];

  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-content">
        <h1 className="main-title">
          Terms of Use and Privacy Policy for <span className="highlight">Zyrix</span>
        </h1>
        
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

export default PrivacyPolicyPage;