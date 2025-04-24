"use client"

import { ActionIcon } from "@mantine/core"
import { IconLanguage } from "@tabler/icons-react"
import { useLanguage } from "../../context/LanguageContext"

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <ActionIcon 
      variant="outline" 
      onClick={toggleLanguage} 
      title={t("changeLanguage")} 
      radius="xl" 
      size="lg"
    >
      <span style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
        {language === "en" ? "VI" : "EN"}
      </span>
    </ActionIcon>
  )
}