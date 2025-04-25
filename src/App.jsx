import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { WeatherDashboard } from "./page/WeatherDashboard";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div>
          <WeatherDashboard />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
