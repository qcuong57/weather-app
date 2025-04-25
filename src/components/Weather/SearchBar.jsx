import { TextInput, Button } from "@mantine/core";
import { useLanguage } from "../../context/LanguageContext";

export function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
}) {
  const { t } = useLanguage();

  return (
    <form onSubmit={handleSearch} className="w-full">
      <TextInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t("yourCity")}
        size="lg"
        radius="md"
        mb="lg"
        className="w-full"
        rightSection={
          <Button
            type="submit"
            loading={loading}
            size="sm"
            radius="md"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {t("search")}
          </Button>
        }
        rightSectionWidth={110}
      />
    </form>
  );
}
