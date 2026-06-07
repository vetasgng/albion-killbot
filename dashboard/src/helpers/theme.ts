export interface ThemeProps {
  name: string;

  background: string;
  surface: string;
  surfaceElevated: string;
  borderSubtle: string;

  primary: string;
  secondary: string;
  danger: string;

  text: string;
  contrastText: string;
  mutedText: string;
  subtleText: string;

  rgb?: {
    background?: string;

    primary?: string;
    secondary?: string;
    danger?: string;

    text?: string;
    contrastText?: string;
    mutedText?: string;
  };

  servers: {
    [server: string]: string;
  };

  layout: {
    sidebarWidth: string;
    contentMaxWidth: string;
    navSectionGap: string;
    navItemRadius: string;
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    padding: {
      pageY: {
        lg: string;
        xl: string;
        xxl: string;
      };
      pageX: {
        lg: string;
        xl: string;
        xxl: string;
      };
      panel: {
        base: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      sidebar: {
        lg: string;
        xl: string;
        xxl: string;
      };
      layoutGap: {
        lg: string;
        xl: string;
        xxl: string;
      };
    };
  };

  nav: {
    activeBackground: string;
    activeBorder: string;
  };
}

const theme: ThemeProps = {
  name: "dark",

  background: "#1c1c1c",
  surface: "#242424",
  surfaceElevated: "#2f2f2f",
  borderSubtle: "rgba(255, 255, 255, 0.08)",

  primary: "#ffbd59",
  secondary: "#69657c",
  danger: "#c42936",

  text: "#ffffff",
  contrastText: "#333333",
  mutedText: "#6c757d",
  subtleText: "#adb5bd",

  rgb: {
    primary: "255,189,89",
    secondary: "105,101,124",
  },

  servers: {
    americas: "#33673b",
    asia: "#cc3f0c",
    europe: "#3b68a3",
  },

  layout: {
    sidebarWidth: "260px",
    contentMaxWidth: "960px",
    navSectionGap: "1.5rem",
    navItemRadius: "0.5rem",
    breakpoints: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1904px",
    },
    padding: {
      pageY: {
        lg: "0.5rem",
        xl: "1rem",
        xxl: "1.25rem",
      },
      pageX: {
        lg: "0.5rem",
        xl: "1.25rem",
        xxl: "1.5rem",
      },
      panel: {
        base: "0.75rem",
        md: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        xxl: "1.75rem",
      },
      sidebar: {
        lg: "0.875rem",
        xl: "1rem",
        xxl: "1.125rem",
      },
      layoutGap: {
        lg: "1rem",
        xl: "1.25rem",
        xxl: "1.5rem",
      },
    },
  },

  nav: {
    activeBackground: "rgba(255, 189, 89, 0.12)",
    activeBorder: "#ffbd59",
  },
};

export default theme;
