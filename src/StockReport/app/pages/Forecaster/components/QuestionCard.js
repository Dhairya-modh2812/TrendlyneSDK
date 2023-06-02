import React, { Fragment } from 'react'
import QuestionItem from './QuestionItem';
import LinearLineBar from './LinearLineBar';
function QuestionCard(props) {
    const { list } = props;
    
    let totalYes = 0;
    let totalNo = 0;
    list.forEach(item => {
        if(item.answer) {
            totalYes += 1;
        }else {
            totalNo += 1;
        }
    })

    return <Fragment>
        <div className="col-6 mb-4">
            <LinearLineBar 
                showLabel = {true}
                yesLabel={'criteria met'}
                noLabel={'not met'}
                yes={totalYes}
                no={totalNo}
            />
            </div>
            <div className="col-11">
            {list && list.map(item => {
                return <QuestionItem item={item}/>
            })}
        </div>
    </Fragment>
}

export default QuestionCard;