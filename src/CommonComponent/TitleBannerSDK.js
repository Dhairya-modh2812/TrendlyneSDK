/**
 * @function TitleBanner: Creates a page Title Banner which contains title, description, FAQs, etc
 * Core:
 * @param {Object} props : The Object with all the Header information.
 * @param {string} props.imageUrl: image url
 * @param {string} props.imageAlt: image alt attribute value
 * @param {string} props.title: Page Title
 * @param {string} props.description: Page Description
 * @param {string} props.faqUrl: FAQ link
 * @param {string} props.faqTitle: FAQ title attribute which is shown at hover
 *
 * Optional:
 * @param {Array.<{label: string, link: string}>} [props.breadcrumb] : creates the breadcrumb
 * @param {string} [props.imageClass] : if we want to override something on the image class
 * @param {string} [props.titleToolTip] : Page Title info ToolTip (creates an icon with "i")
 * @param {boolean} [props.descriptionBottomGap] : creates the gap below the description
 * @param {object} [props.descriptionBottom] : if we want to put something below the description (JSX)
 * @param {object} [props.bannerRight] : if we want to put something on the right of the banner (JSX)
 * @param {string} [props.note] : at the bottom shows "Note: ..."
 */

import { Breadcrumbs } from '../IPO/app/components/Breadcrumbs';
import './Title_Banner_SDK.scss';

const TAG_MAP = {
    etf: 'h3',
};

function TitleBannerSDK(props) {
    const {
        imageUrl,
        imageAlt,
        title,
        description,
        faqUrl,
        faqTitle,
        breadcrumb,
        imageWidth,
        imageClass,
        titleToolTip,
        descriptionBottomGap,
        descriptionBottom,
        bannerRight,
        note,
        screenName,
    } = props;

    let TitleTag = 'screenName' in props && screenName in TAG_MAP ? TAG_MAP[screenName]: "h1";

    return (
        <div className="pt-sdk-container">
            {breadcrumb ? <Breadcrumbs data={breadcrumb} /> : null}

            <div className="ptc-sdk-content">
                <div className="hidden-sm-down">
                    {imageUrl ? (
                        <div className="hidden-sm-down">
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                width={imageWidth}
                                className={imageClass}
                            />
                        </div>
                    ) : null}
                </div>

                <div className="ptc-header-content">
                    <div className="ptc-title-faq">
                        {title ? (
                            <TitleTag>
                                {title}
                                {titleToolTip ? (
                                    <i
                                        className="alert-mesg-font-size-sm sprite-navbar sprite-information-circle-blue-18x18 ml05r pointer"
                                        data-toggle="tooltip"
                                        data-title={titleToolTip}
                                    ></i>
                                ) : null}
                            </TitleTag>
                        ) : null}
                        {faqUrl ? (
                            <a
                                className='mb-2 ptc-faq-link'
                                href={faqUrl}
                                title={faqTitle}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit FAQs
                                <i
                                    className="fa fa-angle-right fa-lg ml6"
                                    aria-hidden="true"
                                ></i>
                            </a>
                        ) : null}
                    </div>

                    {description ? (
                        <div className="ptc-head-description">
                            <h4 className="ptc-description-content">
                                {description}
                            </h4>
                        </div>
                    ) : null}

                    {descriptionBottomGap ? (
                        <div className="ptc-break"></div>
                    ) : null}

                    {descriptionBottom ? (
                        <div className="ptc-bottom-nav">
                            {descriptionBottom}
                        </div>
                    ) : null}
                </div>
                {bannerRight ? (
                    <div className="ptc-banner-right">{bannerRight}</div>
                ) : null}
            </div>

            {note ? <p className="pt-note">{note}</p> : null}
        </div>
    );
}

export default TitleBannerSDK;
