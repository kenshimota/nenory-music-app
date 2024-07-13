import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";

const buttons = {
    fontFamily: "Montserrat",
    textTransform: "uppercase",
};

const themes = {
    default: {
        typography: {
            h1: { fontFamily: "Bebas Neue" },
            h2: { fontFamily: "Bebas Neue" },
            h3: { fontFamily: "Bebas Neue" },
            h4: { fontFamily: "Bebas Neue" },
            h5: { fontFamily: "Bebas Neue" },
            h6: { fontFamily: "Bebas Neue" },
            subtitle1: { fontFamily: "Montserrat" },
            subtitle2: { fontFamily: "Montserrat" },
            body1: { fontFamily: "Montserrat" },
            body2: { fontFamily: "Montserrat" },
        },
        palette: {
            primary: {
                main: "#27bf76",
            },
        },
    },

    light: {
        background: {
            default: "#F1F1F1",
            paper: "#fff",
        },
        button: { ...buttons, color: "#fff" },
    },

    dark: {
        background: {
            default: "#111",
            paper: "#666",
        },

        button: { ...buttons, color: "#333" },
    },
};

const getMedia = (media) =>
    media
        .slice(1, media.length - 1)
        .split(":")
        .pop()
        .trim();

const getThemeOS = () => {
    const ref = window.matchMedia("(prefers-color-scheme: light)");
    const media = getMedia(ref.media);
    return { ref, media };
};

const useTheme = () => {
    const { ref, media } = getThemeOS();
    const [themeOs, setThemeOs] = useState(media);
    const theme = { ...themes[themeOs], ...themes.default };

    useEffect(() => {
        ref.addEventListener("change", (e) => {
            const newTheme = e.matches ? "light" : "dark";
            setThemeOs(newTheme);
        });
    }, []);

    console.log(themeOs);

    return createTheme(theme);
};

export default useTheme;
