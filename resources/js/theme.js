import { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";

const themes = {
    default: {
        typography: {
            h1: { fontFamily: "Bebas Neue" },
            h2: { fontFamily: "Bebas Neue" },
            h3: { fontFamily: "Bebas Neue" },
            h4: { fontFamily: "Bebas Neue" },
            h5: { fontFamily: "Bebas Neue" },

            button: {
                fontFamily: "Montserrat",
                textTransform: "uppercase",
            },
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
    },

    dark: {
        background: {
            default: "#111",
            paper: "#666",
        },
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
