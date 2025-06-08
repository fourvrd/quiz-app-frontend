import { createFileRoute } from "@tanstack/react-router";
import { MenuButton } from "@/components/MenuButton";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="grid grid-cols-2 px-[6rem] pt-[6rem] gap-[6rem] space-y-[-2rem]">
      <MenuButton text="Astronomia" />
      <MenuButton text="Biologia" />
      <MenuButton text="Chemia" selected={true} />
      <MenuButton text="Geografia" />
      <MenuButton text="Matematyka" disabled={true} />
    </div>
  );
}
