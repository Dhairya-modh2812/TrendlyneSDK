import React, { useRef } from 'react';

const emptyFunc = () => {};

const SWIPE_PERCENTAGE = 0.25;
export default function Swipe(props) {
    const {
        children = 'Swipe me to the left or right',
        leftObj = {},
        rightObj = {},
        leftActionHandler = emptyFunc,
        rightActionHandler = emptyFunc,
    } = props;
    const swipeRef = useRef(null);

    const { leftText = 'Buy' } = leftObj;
    const { rightText = 'Sell' } = rightObj;

    const handleSwipe = () => {
        // define the minimum distance to trigger the action
        if (swipeRef.current) {
            const container = swipeRef.current;
            // get the distance the user swiped
            const swipeDistance = container.scrollLeft - container.clientWidth;
            const minDistance = container.clientWidth * SWIPE_PERCENTAGE;
            if (container.scrollLeft !== 0) {
                if (swipeDistance < (minDistance * -1)) {
                    // console.log("swiped left");
                    leftActionHandler();
                } else if (swipeDistance > minDistance) {
                    // console.log("swiped right");
                    rightActionHandler();
                } else {
                    // console.log(`did not swipe ${minDistance}px`);
                }
            }
        }
    };

    return (
        <div
            className="swipe-container"
            ref={swipeRef}
            onTouchEnd={handleSwipe}
        >
            <div
                style={{ display: 'none' }}
                className="swipe-action swipe-left"
            >
                {leftText}
            </div>
            <div className="swipe-element">{children}</div>
            <div
                style={{ display: 'none' }}
                className="swipe-action swipe-right"
            >
                {rightText}
            </div>
        </div>
    );
}
