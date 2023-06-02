import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DonutChart from "react-donut-chart";

 export function BarChartComponent(props) {
     
   const ref = useRef(null)

    const {data} = props;

    useEffect(() => {
      if(data){         
        let dataoption = [data?.retail_individual_investor, data?.non_institutional_investor, data?.qualified_institutional_buyers]
        setchartoption (preoptions => {
            return{
                ...preoptions, 
                series:[
                    {
                        ...preoptions.series[0],
                        data:dataoption
                    }
                ]
            }
        })
        ref?.current?.chart.redraw()
      }    

    }, [data]);
    
    
    const options = {
        chart: {
            type: 'column', 
            spacingLeft: 0,
            spacingRight: 0,               
        },
        legend: {
            visible: false
        },      
        xAxis: {
            categories: ['Retail Individual Investor', 'Non - Institutional Investor', 'Qualified Institutional Buyers'],
            
        },

        yAxis: {
            visible: true,           
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: true,
            formatter: function () {
                return '<b>' + this.x + '</br>'  +this.series.name+ ': &nbsp'   + this.y +  'x';

            }
            
        },
    
        plotOptions: {
            series: {
                pointWidth: 40,
                color: '#016aff',
                borderRadius: 3,
                
            }
        },
    
        series: [{
            data: [],
            name: 'Subscription(times)',
        }]
        
    }

    const [chartoption, setchartoption] = useState(options);

    if (data == undefined) {
       return <></>
    }
    return (
        <>
            <div className="card_block_style_one">             
                <HighchartsReact
                highcharts={Highcharts}
                options={chartoption}
                ref={ref}

            />                
            </div>  
        </>
    );
}