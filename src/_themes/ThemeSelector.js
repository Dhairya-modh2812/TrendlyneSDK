import { Suspense } from 'react'
import ThemeConfigs from './configs'
import {ThemeEnum, AppEnum} from './enum'


const CurrentThemeSelector = ({ app, theme }) => {
    const CurrentTheme = ThemeConfigs[app] && ThemeConfigs[app][theme]

    if (!CurrentTheme) console.warn('Please provide app and theme configuration properly');

    return CurrentTheme ? <CurrentTheme /> : null
}


/* This component decides which theme to apply */
const ThemeSelector = ({ app = AppEnum.SUPERSTAR_PORTFOLIO, theme = ThemeEnum.DEFAULT, children }) => {
    return (
        <>
            <Suspense fallback={<></>}>
                <CurrentThemeSelector app={app} theme={theme} />
                {children}
            </Suspense>
        </>
    )
}

export default ThemeSelector