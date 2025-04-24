"use client"

import { TextInput, Button } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useLanguage } from "../../context/LanguageContext"

export function SearchBar({ searchQuery, setSearchQuery, handleSearch, loading }) {
  const { t } = useLanguage()

  return (
    <form onSubmit={handleSearch}>
      <TextInput
        icon={<IconSearch size={18} />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t("yourCity")}
        rightSection={
          <Button type="submit" loading={loading} sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
            {t("search")}
          </Button>
        }
        size="md"
        radius="md"
        mb="lg"
      />
    </form>
  )
}
