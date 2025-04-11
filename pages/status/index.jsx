import { Skeleton } from "components/shadcn/skeleton";
import { Clock, Database } from "lucide-react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

function StatusPage() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetcher, {
    refreshInterval: 2000,
  });

  if (error) {
    return <h1>Erro ao carregar o status</h1>;
  }

  if (isLoading) {
    return <DatabaseCardSkeleton />;
  }

  const { database: databaseData } = data.dependencies;
  const formattedDate = new Date(data.updated_at).toLocaleString("pt-BR");

  return (
    <main className="flex h-screen w-full flex-col items-center gap-6 bg-gray-50">
      <h1 className="p-5 text-center text-4xl font-bold underline">
        Status do Sistema
      </h1>

      <div className="w-80 rounded-lg border bg-white p-5">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
          <Clock className="size-5" /> Última atualização
        </h2>
        <p>{formattedDate}</p>
      </div>

      <div className="w-80 rounded-lg border bg-white p-5 px-8">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
          <Database className="size-5" /> Status do Banco de Dados
        </h2>
        <div className="space-y-2">
          <DatabaseCard label="Versão" value={databaseData.version} />
          <DatabaseCard
            label="Máximo de conexões"
            value={databaseData.max_connections}
          />
          <DatabaseCard
            label="Conexões em aberto"
            value={databaseData.opened_connections}
          />
        </div>
      </div>
    </main>
  );
}

function DatabaseCard({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <p>{label}: </p>
      <span className="rounded-2xl bg-gray-200 px-2 font-semibold">
        {value}
      </span>
    </div>
  );
}

function DatabaseCardSkeleton() {
  return (
    <div className="flex h-screen w-full flex-col items-center gap-6 bg-gray-50 pt-4">
      <Skeleton className="h-12 w-72" />
      <Skeleton className="h-24 w-72" />
      <Skeleton className="h-40 w-72" />
    </div>
  );
}
export default StatusPage;
