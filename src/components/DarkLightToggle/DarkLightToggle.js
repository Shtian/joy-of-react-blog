"use client";
import React from "react";
import { Moon, Sun } from "react-feather";
import VisuallyHidden from "@/components/VisuallyHidden";
import Cookie from "js-cookie";
import { LIGHT_COLORS, DARK_COLORS, THEME_COOKIE_NAME } from "@/constants";
function DarkLightToggle({ initialTheme, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);
  function handleClick() {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    Cookie.set(THEME_COOKIE_NAME, nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button {...delegated} onClick={handleClick}>
      {theme === "dark" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
