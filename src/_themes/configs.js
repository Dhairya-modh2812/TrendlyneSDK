import { lazy } from 'react'
import {ThemeEnum, AppEnum} from './enum'


/* Include the imports here  */
const SuperstarDefaultTheme = lazy(() => import('./superstar_portfolio/default'))
const SuperstarIchbiahTheme = lazy(() => import('./superstar_portfolio/ichbiah'))
const SuperstarKayalTheme = lazy(() => import('./superstar_portfolio/kayal'))
const SuperstarHuffmanTheme = lazy(() => import('./superstar_portfolio/huffman'))

const XYComparisonDefaultTheme = lazy(() => import('./xy_comparison/default'))
const XYComparisonTrendlyneTheme = lazy(() => import('./xy_comparison/trendlyne'))

const IPODefaultTheme = lazy(() => import('./IPO/default'))
const IPOTrendlyneTheme = lazy(() => import('./IPO/trendlyne'))

const PriceTargetAlertsDefaultTheme = lazy(() => import('./price_target_alerts/default'));
const PriceTargetAlertsHuffmanTheme = lazy(() => import('./price_target_alerts/huffman'));

/* Include the config based on the import */
const ThemeConfigs = {
    [AppEnum.SUPERSTAR_PORTFOLIO]: {
        [ThemeEnum.DEFAULT]: SuperstarDefaultTheme,
        [ThemeEnum.ICHBIAH]: SuperstarIchbiahTheme,
        [ThemeEnum.KAYAL]: SuperstarKayalTheme,
        [ThemeEnum.HUFFMAN]: SuperstarHuffmanTheme,
    },
    [AppEnum.XY_COMPARISON]: {
        [ThemeEnum.DEFAULT]: XYComparisonDefaultTheme,
        [ThemeEnum.TRENDLYNE]: XYComparisonTrendlyneTheme,
    },
    [AppEnum.IPO]: {
        [ThemeEnum.DEFAULT]: IPODefaultTheme,
        [ThemeEnum.TRENDLYNE]: IPOTrendlyneTheme,
    },
    [AppEnum.PRICE_TARGET_ALERTS]: {
        [ThemeEnum.DEFAULT]: PriceTargetAlertsDefaultTheme,
        [ThemeEnum.HUFFMAN]: PriceTargetAlertsHuffmanTheme,
    },
}

export default ThemeConfigs
