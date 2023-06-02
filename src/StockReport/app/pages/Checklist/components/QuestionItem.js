import React from 'react'

function QuestionItem(props) {
    const { item } = props;
    return (
        <div className="risks-content">
            <div className="row align-items-center">
            <div className="col-10">
                <h4 className="f-bold">{item.question}</h4>
                <p className="f-regular">{item?.desc}</p>
            </div>
            <div className="col-2">
                {item.answer ? <label className="btn-label positive">
                <RightCheck /> Yes
                </label> : <label className="btn-label negative">
                <NoIcon /> No
                </label>}
                
            </div>
            </div>
        </div>
    )
}

export default QuestionItem;

const RightCheck = () => {
    return <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.143.813C3.204.813 0 4.017 0 7.955c0 3.939 3.204 7.143 7.143 7.143 3.938 0 7.143-3.204 7.143-7.143 0-.804-.14-1.575-.387-2.297l-1.156 1.156a5.721 5.721 0 0 1-5.6 6.855 5.721 5.721 0 0 1-5.714-5.714 5.721 5.721 0 0 1 5.714-5.714c1.166 0 2.251.353 3.157.956l1.023-1.023A7.1 7.1 0 0 0 7.143.813zm6.638.923L6.429 9.088 4.076 6.736l-1.01 1.01 3.363 3.362 8.362-8.362-1.01-1.01z" fill="#00D684" fillRule="nonzero"/>
  </svg>
}
  
  const NoIcon = () => {
    return <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5.813C3.367.813 0 4.178 0 8.313c0 4.133 3.367 7.5 7.5 7.5s7.5-3.367 7.5-7.5c0-4.134-3.367-7.5-7.5-7.5zm0 1.5c3.323 0 6 2.677 6 6 0 3.322-2.677 6-6 6s-6-2.678-6-6c0-3.323 2.677-6 6-6zm-2.47 2.47-1.06 1.06 2.47 2.47-2.47 2.47 1.06 1.06 2.47-2.47 2.47 2.47 1.06-1.06-2.47-2.47 2.47-2.47-1.06-1.06L7.5 7.251l-2.47-2.47z" fill="#FF5055" fillRule="nonzero"/>
  </svg>
}