import XYComparisonContext from "./XYComparisonContext";

const XYComparisonState = (props) => {

    const { baseUrl, viewType } = props || {};

    return (
        <XYComparisonContext.Provider
            value={{ 
                baseUrl,
                viewType,
            }}
        >
        {props.children}
    </XYComparisonContext.Provider>
  );
};

export default XYComparisonState;
