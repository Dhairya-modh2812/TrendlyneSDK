import React, {useState} from "react";
import company from "../../../_assets/images/IPO/compay.png"
import { Accordion } from "react-bootstrap";
// import { Questions } from "./questions";
import Arrow from "../../../_assets/images/IPO/arrow.svg"


export function FAQ() {

    const Questions = [
        {
            id:1,
            question:'About IPO',
            answer:"Following an IPO, the company's shares are traded on a stock exchange. Some of the main motivations for undertaking an IPO include: raising capital from the sale of the shares, providing liquidity to company founders and early investors, and taking advantage of a higher valuation."
        },
        {
            id:2,
            question:'What this IPO is about?',
            answer:"Following an IPO, the company's shares are traded on a stock exchange. Some of the main motivations for undertaking an IPO include: raising capital from the sale of the shares, providing liquidity to company founders and early investors, and taking advantage of a higher valuation."
        },
        {
            id:3,
            question:'Why does a company launch IPO',
            answer:"Following an IPO, the company's shares are traded on a stock exchange. Some of the main motivations for undertaking an IPO include: raising capital from the sale of the shares, providing liquidity to company founders and early investors, and taking advantage of a higher valuation."
        },
        {
            id:4,
            question:'Who can invest in IPOs',
            answer:"Following an IPO, the company's shares are traded on a stock exchange. Some of the main motivations for undertaking an IPO include: raising capital from the sale of the shares, providing liquidity to company founders and early investors, and taking advantage of a higher valuation."
        },
        {
            id:5,
            question:'How to apply in IPOs',
            answer:"Following an IPO, the company's shares are traded on a stock exchange. Some of the main motivations for undertaking an IPO include: raising capital from the sale of the shares, providing liquidity to company founders and early investors, and taking advantage of a higher valuation."
        },
        {
            id:6,
            question:'How to know the wait period of IPO',
            answer:"Following an IPO, the company's shares are traded on a stock exchange. Some of the main motivations for undertaking an IPO include: raising capital from the sale of the shares, providing liquidity to company founders and early investors, and taking advantage of a higher valuation."
        },
        {
            id:7,
            question:'Who can invest in IPOs',
            answer:"Following an IPO, the company's shares are traded on a stock exchange. Some of the main motivations for undertaking an IPO include: raising capital from the sale of the shares, providing liquidity to company founders and early investors, and taking advantage of a higher valuation."
        }
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
                    "text": obj.answer
                }
            }
        ))
    };

    return (
        <>
            <div className="section_FAQ">
                <div className="container">
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
        <h6>{question.question}</h6>
        <div className="item_des"><div>{question.answer}</div></div>
        <img
        className="faq_icon"
        src={Arrow}
        alt="Arrow"
        /> 
        </li>
    )
}

