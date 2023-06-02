import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { dateFormatter, timeFormatter, pdfRender, imgRender, videoRender} from "../../../_helpers/CommonFunctions";
import { NewsFooter } from "./NewsFooter";

export function PopularNews(props) {  

    const { data, postpagelink } = props

    const [show, setShow] = useState({ open: false, data: null });

    const handleClose = () => setShow({ open: false, data: null });
    const handleShow = (data) => setShow({ open: true, data: data });

    if(data == null  || data == undefined || data.length == 0 ){
        return <></>
    }

    return (                   
            <section>
                <div className="popluar_news">
                    <div className="container">
                        <div className="info_block">
                            <div className="info_heading">
                                <h2>Trendlyne Analysis</h2>
                            </div>
                            <div className="news">
                                <div className="row">
                                    {data?.map((item, index) => {
                                        return (
                                            <div className="col" key={index}>
                                                <div className="news-content flex">
                                                    <div className="img_block">
                                                    {imgRender(item.url, item.imageUrl)}
                                                    {videoRender(item.embedvideoUrl, handleShow)}
                                                    </div>
                                                        <div  className="block-content ">
                                                            <a href={item.url} className="d-block">
                                                                <h5 className="mt-0">{item.title}</h5>
                                                                <p>{item.description}</p>                                                                      
                                                            </a>
                                                            <div className="blog_footer">
                                                                <ul className="d-flex">
                                                                    <li>{dateFormatter(item.pubDate, "DD MMM YYYY")}</li>
                                                                    <li> {timeFormatter(item.pubDate)} </li>
                                                                </ul>                                                            
                                                                {pdfRender(item.pdfUrl)}                                                            
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                            <NewsFooter 
                             postpagelink={postpagelink}
                            ></NewsFooter>                           
                        </div>
                    </div>
                </div>
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
                        <iframe width="100%" height="393" src={show?.data} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                      
                    </Modal.Body>
                </Modal>
            </section>                
    );
}