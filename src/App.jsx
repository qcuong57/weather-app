import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { WeatherDashboard } from "./page/WeatherDashboard";
import { MantineProvider } from "@mantine/core";
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <WeatherDashboard />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </MantineProvider>
  );
}

export default App;
