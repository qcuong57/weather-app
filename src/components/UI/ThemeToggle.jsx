
import { ActionIcon, useMantineColorScheme } from "@mantine/core"
import { IconSun, IconMoon } from "@tabler/icons-react"
import { useLanguage } from "../../context/LanguageContext"

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { t } = useLanguage()
  const dark = colorScheme === "dark"

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title={t("changeTheme")}
      radius="xl"
      size="lg"
    >
      {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  )
}
