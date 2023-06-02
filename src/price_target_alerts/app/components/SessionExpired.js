function SessionExpired(props) {
    return (
        <div className="session-expired-container position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
            <div className="session-expired-message rounded-3 px-5 py-3">
                <div>
                    <p className="mb-1">Your session has expired!</p>
                    <p className="mb-0">Please login again to continue</p>
                </div>
            </div>
        </div>
    );
}

export default SessionExpired;
