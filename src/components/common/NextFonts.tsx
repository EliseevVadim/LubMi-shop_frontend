import localFont from 'next/font/local'
import React from "react";

const fontInter = localFont({
    src: [
        {
            path: '../../assets/fonts/Geologica-Light.ttf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Geologica-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Geologica-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Geologica-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../assets/fonts/Geologica-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-base',
    fallback: ['sans-serif'],
})


export const NextFonts = () => {
    return (
        <style jsx global>{`
          :root {
            --font-base: ${fontInter.style.fontFamily};
          }
    `}</style>
    )
}
