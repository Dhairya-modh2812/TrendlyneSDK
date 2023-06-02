import React, {useState} from "react";
import Arrow from "../../../_assets/images/IPO/arrow.svg"


export function FAQListing() {

    const Questions = [
        {
            id:1,
            question:'What is an IPO?',
            answer:"An initial public offering (IPO) is a procedure by which private companies sell their shares to public investors through a book-building process. Investors will bid to buy shares within a price band, and based on the highest number of bids received at a particular price, the issue price will be determined."
        },
        {
            id:2,
            question:'Types of investors who can participate in an IPO',
            answer:<span
            dangerouslySetInnerHTML={{
              __html: '<p><strong>QIBs</strong> are the registered institutional investors that directly apply in the Qualified Institutional Bidders category.</p><p><strong>HNIs</strong> are investors who apply for shares in an IPO worth above Rs 2 lakh and come under non individual investor (or HNI) category.</p> <p><strong>Retail investors</strong> are individuals who apply for shares less than Rs 2 lakh in an IPO.</p>'
            }}></span>,
            jsonLdAnswer: '<p><strong>QIBs</strong> are the registered institutional investors that directly apply in the Qualified Institutional Bidders category.</p><p><strong>HNIs</strong> are investors who apply for shares in an IPO worth above Rs 2 lakh and come under non individual investor (or HNI) category.</p> <p><strong>Retail investors</strong> are individuals who apply for shares less than Rs 2 lakh in an IPO.</p>'
        },
        {
            id:3,
            question:'How can I apply for an IPO?',
            answer:"Investors should have a demat account with their broker. If you have a demat account, you can look for the IPO section in your demat account and select the company in which you want to invest in. Based on the amount you bid for, you will be classified either as a retail or HNI investor. Remember, the value of the shares for which you have placed bids in an IPO will be blocked from your account till the allotment of shares is completed. If you are allotted shares in the IPO, then any balance amount will be unblocked or credited into your account."
        },
        {
            id:4,
            question:'How does the IPO allotment process work?',
            answer:"If you invest in the retail investor category, as of now, shares are allotted on a first come first served basis. If you bid for shares worth over Rs 2 lakh (HNI quote), then the allotment will be done on a proportionate basis on the amount of your bid."
        },       
    ]

    const faqs = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "publisher": {
            "@type": "Organization",
            "name": "Trendlyne",
            "url" : "https://trendlyne.com/",
            "logo" : {
                "@type": "ImageObject",
                "contentUrl": "https://cdn-static.trendlyne.com/static/TL-logomark.png"
            }
        },
        "mainEntity": Questions.map(obj => (
            {
                "@type": "Question",
                "name": obj.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "jsonLdAnswer" in obj ? obj.jsonLdAnswer : obj.answer
                }
            }
        ))
    };

    return (
        <>
            <div className="section_FAQ">
                <div className="container-fluid">
                   <h2>FAQ</h2>
                   <script type="application/ld+json">
                        {JSON.stringify(faqs)}                        
                    </script>  
                    <div>
                    <ul className="faq_block">
                        {Questions.map((question, index) => 
                          <LiItem 
                          key={question.id}
                          question={question} />
                        
                        )}
                    </ul>
                    </div> 
                              
                </div>
            </div>
        </>
    );
}

const LiItem = (props) => {
    const {question} = props;

    const [isActive, setActive] = useState(true);

    const toggleClass = () => {
      setActive(!isActive);
    };


    return(
        <li
            key={question.id}
            className={isActive ? 'active': null} 
            onClick={toggleClass} 
        >
            <h3>{question.question}</h3>
            <p className="item_des">{question.answer}</p>
            <img
                className="faq_icon"
                src={Arrow}
                alt="Arrow"
            /> 
        </li>
    )
}

