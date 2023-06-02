import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { dateFormatter, timeFormatter, pdfRender, imgRender, videoRender } from "../../../_helpers/CommonFunctions";
import { NewsFooter } from "./NewsFooter";


export function News(props) {

    const { data, postpagelink } = props             
              
    const [show, setShow] = useState({ open: false, data: null });

    const handleClose = () => setShow({ open: false, data: null });
    const handleShow = (data) => setShow({ open: true, data: data });      
    
 
    if(data == null  || data == undefined || data.length == 0 ){
        return <></>
    }

    let latestblock = data[0]
    let subblock = data.slice(1, data.length)
  
 

    return (
               
            <>
                <div className="section_header">
                    <h2>Trendlyne Analysis</h2>
                </div>
                <div className="news">
                    <div className="row">
                        {
                            latestblock &&

                            <div className="col-md-4">
                                <div className="news-content latest">
                                    <div className="img_block">
                                    {imgRender(latestblock.url, latestblock.imageUrl)}                                                                       
                                    {videoRender(latestblock.embedvideoUrl, handleShow)}                                                                           
                                    </div>
                                    
                                        <div className="blog_content">
                                        <a href={latestblock.url} className="d-block" alt={latestblock.title}>
                                        <h5>{latestblock.title}</h5>
                                            <p>{latestblock.description}</p>
                                                            </a>
                                        </div>
                                        
                                        <div className="blog_footer">
                                            <ul className="d-flex">
                                                <li>{dateFormatter(latestblock.pubDate, "DD MMM YYYY")}</li> 
                                                <li> {timeFormatter(latestblock.pubDate)} </li>                                                      
                                            </ul>                                                                                     
                                                {pdfRender(latestblock.pdfUrl)}                                                                                                                                
                                        </div>
                                    
                                </div>
                            </div>
                        }

                        <div className="col-md-8">
                            <div className="row">
                                {
                                    subblock.map((item, index) => {
                                        return (
                                            <div className="col-md-6" key={index}>
                                                <div className="news-content flex">
                                                    <div className="img_block">
                                                    {imgRender(item.url, item.imageUrl)}                                                          
                                                    {videoRender(item.embedvideoUrl, handleShow)}
                                                    </div>
                                                    <div className="block-content">
                                                        <div className="blog_content">
                                                            <a href={item.url} className="d-block" alt={item.title}>
                                                                <h5 className="mt-0">{item.title}</h5>
                                                                <p>{item.description}</p>
                                                            </a>
                                                        </div>
                                                        <div className="blog_footer">
                                                            <ul className="d-flex">
                                                            <li>{dateFormatter(item.pubDate, "DD MMM YYYY")}</li> 
                                                            <li> {timeFormatter(item.pubDate)} </li>
                                                            </ul>                                                            
                                                            {pdfRender(item.pdfUrl)}                                                            
                                                        </div></div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <NewsFooter 
                postpagelink={postpagelink}
                ></NewsFooter>
               
                <Modal show={show.open} onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    style={{ opacity: 1, marginTop: "5rem", paddingTop: "8rem" }}
                >
                    <Modal.Header>
                        <button type="button" className="close"
                            data-dismiss="modal"
                            onClick={handleClose}
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe width="100%" height="393" src={show.data} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Modal.Body>
                </Modal>
            </>           
       
    );
}
