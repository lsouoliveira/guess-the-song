import { Container } from "@mantine/core"
import { MantineProvider, createTheme } from "@mantine/core"

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
})

export default function GamesLayout({ children }) {
  return (
    <MantineProvider theme={theme}>
      <header className="flex items-center h-14 bg-(--mantine-color-body) border-b px-(--mantine-spacing-md) border-b border-[light-dark(var(--mantine-color-gray-3),_var(--mantine-color-dark-4))]">
        <div>
          <h1 className="text-lg font-semibold">Guess the Song</h1>
        </div>
      </header>

      <Container size="sm">{children}</Container>
    </MantineProvider>
  )
}
