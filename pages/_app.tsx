import type { AppProps } from "next/app"
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"

import { store } from "@/lib/store/store"
import "@/styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}
