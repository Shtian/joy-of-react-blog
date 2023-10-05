import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";

import { LIGHT_TOKENS, DARK_TOKENS, THEME_COOKIE_NAME } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";
import RespectMotionPreferences from "@/components/RespectMotionPreferences";
import { cookies } from "next/headers";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const savedTheme = cookies().get(THEME_COOKIE_NAME);
  const theme = savedTheme?.value || "light";
  const themeColors = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={themeColors}
      >
        <body>
          <Header initialTheme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectMotionPreferences>
  );
}

export default RootLayout;
