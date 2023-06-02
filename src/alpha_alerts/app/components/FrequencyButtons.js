import React from "react";

export function FrequencyButtons() {
    return (<>
            <div className="card-text mt-3 text-center">
                <div className="btn-group btn-group-toggle action_buttons"
                     data-toggle="buttons">
                    <label className="btn btn-outline-secondary btn-sm">
                        <input type="radio" name="action" value="1"
                               className="d-none"/>
                        15 Min
                    </label>
                    <label className="btn btn-outline-secondary btn-sm">
                        <input type="radio" name="action" value="2"
                               className="d-none"/>
                        30 Min
                    </label>
                    <label className="btn btn-outline-secondary btn-sm">
                        <input type="radio" name="action" value="3"
                               className="d-none"/>
                        Hourly
                    </label>
                    <label className="btn btn-outline-secondary btn-sm">
                        <input type="radio" name="action" value="4"
                               className="d-none"/>
                        Daily
                    </label>
                </div>
                <p className="text-muted font-size-14 mt-2 mb-0">
                    Notification Frequency</p>
            </div>
        </>
    )
}
