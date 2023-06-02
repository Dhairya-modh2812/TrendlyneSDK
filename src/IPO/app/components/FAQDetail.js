import React, { useState } from "react";
import company from "../../../_assets/images/IPO/compay.png"
import { Accordion } from "react-bootstrap";
// import { Questions } from "./questions";
import Arrow from "../../../_assets/images/IPO/arrow.svg"

export function FAQDetail(props) {

    const { data } = props;


    const faqs = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": []
    }

    // const faqArray = [ {
    //         "@type": "Question",
    //         "name": "What is the policy for late/non-delivery of items ordered online?",
    //         "acceptedAnswer": {
    //           "@type": "Answer",
    //           "text": "<p>Our local teams work diligently to make sure that your order arrives on time, within our normaldelivery hours of 9AM to 8PM in the recipient's time zone. During  busy holiday periods like Christmas, Valentine's and Mother's Day, we may extend our delivery hours before 9AM and after 8PM to ensure that all gifts are delivered on time. If for any reason your gift does not arrive on time, our dedicated Customer Service agents will do everything they can to help successfully resolve your issue.</p><p><a href=https://example.com/orders/>Click here</a> to complete the form with your order-related question(s).</p>"
    //         }
    //     }]

    if (data && data == 0) {
        return <></>
    }

    const faqArray = data && data.map(question => {
        return (
            {
                "@type": "Question",
                "name": question.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": question.answer
                }
            }
        )
    })

    faqs.mainEntity = faqArray;


    return (
        <section>
            {
                data && data.length > 0 &&
                <div className="section_FAQ">
                    <div className="container">
                        <h2>FAQ</h2>
                        <script type="application/ld+json">
                            {JSON.stringify(faqs)}
                        </script>
                        <div>
                            <ul className="faq_block">
                                {data && data.map((question, index) =>

                                    <LiItem 
                                    key={index}
                                    question={question} />

                                )}
                            </ul>
                        </div>

                    </div>
                </div>

            }

        </section>
    );
}

const LiItem = (props) => {
    const { question, index } = props;

    const [isActive, setActive] = useState(true);

    const toggleClass = () => {
        setActive(!isActive);
    };

    return (
        <li          
            className={isActive ? 'active' : null}
            onClick={toggleClass}
        >
            <h6>{question.question}</h6>
            <div className="item_des"><p>{question.answer}</p></div>
            <img
                className="faq_icon"
                src={Arrow}
                alt="Arrow"
            />
        </li>
    )
}

