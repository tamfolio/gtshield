import React from "react";
import Faq from "react-faq-component";

const data = {
  rows: [
    {
      title: "Do I need to create an account to report an incident?",
      content: `No. You can report anonymously through the web, app, USSD, SMS, or IVR. Creating an account allows you to track your report, receive updates, and rate your experience.`,
    },
    {
      title: "What types of incidents can i report?",
      content:
        "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
    },
    {
      title: "Can i report anonymously?",
      content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    },
    {
      title: "How does the SOS alert work?",
      content: <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem ea possimus maiores ipsum in soluta ullam hic praesentium eos tempora.</p>,
    },
    {
        title: "Will I receive updates on my report?",
        content: `No. You can report anonymously through the web, app, USSD, SMS, or IVR. Creating an account allows you to track your report, receive updates, and rate your experience.`,
      },
      {
        title: "What happens after I submit a report?",
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
      },
      {
        title: "Can I rate the police's response?",
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
              Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
              Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
              Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
      {
        title: "What devices can I use to report?",
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
              Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
              Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
              Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
      {
        title: "Is the platform free to use?",
        content: <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem ea possimus maiores ipsum in soluta ullam hic praesentium eos tempora.</p>,
      },
      {
          title: "Can I report for someone else?",
          content: `No. You can report anonymously through the web, app, USSD, SMS, or IVR. Creating an account allows you to track your report, receive updates, and rate your experience.`,
        },
        {
          title: "Is the platform available in multiple languages?",
          content:
            "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
        }
  ],
};

const styles = {
  // bgColor: 'white',
  titleTextColor: "#181D27",
  rowTitleColor: "#181D27",
  rowTitleTextSize: '16px', // optional: control font size
  rowTitleFontWeight: 'bold', // this makes it bold
};

const config = {
    expandIcon: "+",
    collapseIcon: "–", // or "-" for simpler appearance
  };

function FAQ() {
  return (
    <div className="px-4 lg:px-[112px] bg-white py-8 lg:py-14 w-full">
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
