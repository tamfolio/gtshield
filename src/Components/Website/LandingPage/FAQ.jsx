import React from "react";
import Faq from "react-faq-component";

const data = {
  rows: [
    {
      title: "Do I need to create an account to report an incident?",
      content: `No. You can report anonymously through the web, app, USSD, SMS, or IVR. Creating an account allows you to track your report, receive updates, and rate your experience.`,
    },
    {
      title: "What types of incidents can I report?",
      content: `You can report anything that affects your safety or your community's wellbeing, including:
• Theft
• Assault or abuse
• Domestic violence
• Kidnapping
• Murder
• Police misconduct
• Public disturbance
• Emergency situations (via SOS button)`,
    },
    {
      title: "Can I report anonymously?",
      content: `Yes. You can choose not to log in by clicking the "Report Anonymously" button on our Home Page, or select "Hide my identity" when reporting on other channels. Either way, your report will still be treated with urgency.`,
    },
    {
      title: "How does the SOS alert work?",
      content: `The SOS button sends your location and a distress signal directly to the police for immediate response. Use it only in real emergencies when your safety is at risk.`,
    },
    {
      title: "Will I receive updates on my report?",
      content: `Yes. You'll be notified at each stage, from receipt to resolution. If you reported anonymously, you'll receive a unique tracking ID to follow up on your report.`,
    },
    {
      title: "What happens after I submit a report?",
      content: `Your report is automatically sent to the State CP, routed to the Area Command and then escalated to your nearest Local Police Station. Police officers have timelines (SLAs) to treat your report.`,
    },
    {
      title: "Can I rate the police's response?",
      content: `Absolutely. After your report is resolved, you'll be asked to rate your experience with the officer or station. Your feedback helps improve accountability.`,
    },
    {
      title: "What devices can I use to report?",
      content: `You can report using:
• Web
• Mobile App
• SMS
• IVR Call (coming soon)
No smartphone? No problem.`,
    },
    {
      title: "Is the platform free to use?",
      content: `Yes. Naija Shield is completely free to use across all channels including toll-free calls and SMS. No hidden charges.`,
    },
    {
      title: "Can I report for someone else?",
      content: `Yes. If someone you know is unsafe or unable to report themselves, you can submit a report on their behalf. Just provide as much detail as possible.`,
    },
    {
      title: "Is the platform available in multiple languages?",
      content: `Not yet. It's just English for now, but we are expanding this to include more languages soon.`,
    }
  ],
};

const styles = {
  titleTextColor: "#181D27",
  rowTitleColor: "#181D27",
  rowContentColor: "#181D27",
  rowTitleTextSize: '16px',
  rowTitleFontWeight: '600', // Updated to 600
  rowContentTextSize: '14px',
  rowContentFontWeight: '400', // Added font weight for content
};

const config = {
    expandIcon: "+",
    collapseIcon: "–", // or "-" for simpler appearance
  };

function FAQ() {
  return (
    <div className="px-4 lg:px-[112px] bg-white py-8 lg:py-14 w-full" id="faq-section">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl text-center font-semibold text-[#181D27] mb-5">
          Frequently Asked Questions
        </h1>
        <span className="text-[#535862] text-[20px] text-center">
          Everything you need to know about Gateway Shield
        </span>
      </div>
      <div className="px-4 flex items-center justify-center">
        <div className="w-full md:w-2/3 mt-16 flex items-center justify-center faq-wrapper">
          <Faq data={data} styles={styles} config={config} />
        </div>
      </div>
    </div>
  );
}

export default FAQ;