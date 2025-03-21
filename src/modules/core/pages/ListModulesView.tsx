import { Container } from "@/common/components/layouts/Container";

export function ListModulesView() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Crie módulos</h1>
      <Container bordered={true}>
        <p className="text-gray-600 dark:text-gray-400">
          Página de lista de módulos (exemplo)
        </p>
      </Container>
    </div>
  );
}
